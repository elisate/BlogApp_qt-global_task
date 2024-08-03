import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { AppError, catchAsync } from "../middlewares/globaleerorshandling.js";
import { User } from "../models/user.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ success: false, error: 'No users found' });
    }

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id } });
    if (!result) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  let newObject = { ...req.body };

  if (req.files && req.files.profilePicture) {
    const file = req.files.profilePicture[0];
    newObject.profilePicture = `/media/${file.filename}`;
  }

  try {
    const result = await User.update(newObject, {
      where: { id },
      returning: true,
      plain: true
    });

    if (!result[1]) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result[1]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


export const addAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id);
    if (!result) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    result.role = 'admin';
    await result.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully and is now an admin',
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const removeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id);
    if (!result) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    result.role = 'user';
    await result.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully and is now a regular user',
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


