import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";

export const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullNames: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: true
    },
    otpExpiresAt: {
      type: DataTypes.DATE, // Changed to DATE to handle date and time
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
    tableName: 'Users' // Specify the table name
  }
)

// Define associations
User.associate = function (models) {
  User.hasMany(models.Post, { foreignKey: 'authorId', as: 'posts' })
}
