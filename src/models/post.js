import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";
import { Comment } from "./comment.js";
import { User } from "./user.js";

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING, // This will store the image URL
      allowNull: true // Allows the field to be optional
    }
  },
  {
    // Enable timestamps if you want to use Sequelize's built-in timestamp fields
    timestamps: true
  }
)

Post.associate = function (models) {
  Post.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' })
  Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' })
}

export default Post
