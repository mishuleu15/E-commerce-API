const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const jwt = require('jsonwebtoken');
const { createJWT } = require('../utils');
const register = async (req, res) => {
  const { email, name, password, role } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }
  const user = await User.create({ email, name, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  //   const token = jwt.sign(tokenUser, 'jwtSecret', {
  //     expiresIn: '1d',
  //   });

  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send('Login user');
};
const logout = async (req, res) => {
  res.send('Logout user');
};

module.exports = { register, login, logout };
