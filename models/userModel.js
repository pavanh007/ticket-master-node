import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User should have name'],
    },
    gmail: {
      type: String,
      required: [true, 'User should have email address'],
      unique: true,
    },
    mobileNo: {
      type: String,
      required: ['User must have phone number'],
      unique: true,
      match: /^((\+91)?(\s|-)?)(\d{10})$/,
    },
    DOB: {
      type: Date,
      format: 'YYYY-MM-DD',
      required: true,
      trim: true,
    },
    active: {
      type: String,
      enum: ['INACTIVE', 'ACTIVE'],
      default: 'ACTIVE',
      select: false,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: 'user'
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password
        },
        message: "Password are not same!"
      }
    },
    passwordChangedAt: Date
  },
  { timestamps: true }
);



export async function validateCreateUser(userData) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    gmail: Joi.string().email({ tlds: { allow: false } }),
    mobileNo: Joi.string()
      .pattern(/^((\+91)?(\s|-)?)(\d{10})$/)
      .required(),
    dateOfBirth: Joi.date().format('iso').raw(),
    active: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  });
  try {
    return schema.validate(userData);
  } catch (error) {
    console.error(error);
  }
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
} 

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const chnagedTimestamp = parseInt(this.passwordChangedAt.getTime() /1000, 10);
    return JWTTimestamp < chnagedTimestamp;
  }
  return false;
} 
const User = mongoose.model('User', userSchema);

export default User;
