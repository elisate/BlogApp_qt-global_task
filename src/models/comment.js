import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config.js";

export const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts', // Name of the referenced model
        key: 'id' // Key in the referenced model
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the referenced model
        key: 'id' // Key in the referenced model
      }
    }
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
    tableName: 'Comments' // Optionally specify the table name
  }
)

Comment.associate = models => {
  // Comment belongs to a Post
  Comment.belongsTo(models.Post, {
    foreignKey: 'postId', // Column in the Comment model
    as: 'post' // Alias for the association
  })

  // Comment belongs to a User
  Comment.belongsTo(models.User, {
    foreignKey: 'authorId', // Column in the Comment model
    as: 'author' // Alias for the association
  })
}
