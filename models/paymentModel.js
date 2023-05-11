import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  paymentMethod: {
    type: String
  },
  bookingId: {
    type: String,
    required: true,
    trim: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export { Payment }