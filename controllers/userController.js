import catchAsync from './../utilities/catchAsync.js';
import User, { validateCreateUser } from '../models/userModel.js';
import { filterObj } from '../utilities/updateParams.js';



export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Success',
    users: users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const users = await User.findOne({ _id: req.params.id });
  res.status(200).json({
    status: 'Success',
    users: users,
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const { error } = await validateCreateUser(userData); // Validate the user input
   if (error) return res.status(400).send(error.details[0].message);
  const user = await User.create(userData);
  res.status(200).json({
    status: 'success',
    user: user,
  });
});
export const deletUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'user deleted successfully',
    user: user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'name', 'gmail', 'mobileNo');
  const user = await User.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'Success',
    user: user,
  });
});



