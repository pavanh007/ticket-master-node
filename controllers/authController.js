import { promisify } from 'util';

import catchAsync from './../utilities/catchAsync.js';
import User, { validateCreateUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import AppError from './../utilities/appError.js';

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRETE, {
    expiresIn: processe.env.JWT_EXPIRES_IN,
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const { error } = await validateCreateUser(userData); // Validate the user input
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.create(userData);
  const token = signToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    user: user,
  });
});

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and address', 401));
  }
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};

export const protect = catchAsync(async (req, res, next) => {
  //1. Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.header.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! please login to get access.', 401)
    );
  }
  //2. Verification the token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
  //3. check is user still exists
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  //4. Check is user changed the password afer the JWT was issued
  if (currentUser.changePasswordAfter(decode.iat)) {
    return next(new AppError("User recently changed the password", 401))
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});


export const restrict = (...roles) => {
  return (req, res, next) => {
    //roles is an array : ["user", "admin", .....]
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission for this action", 403))
    }
    next();
  }
};