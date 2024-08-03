import Post from "./post.js";

import {sequelize} from '../../config/config.js'
import { Comment } from "./comment.js";
import { User } from "./user.js";

// const sequelize = new Sequelize(process.env.POSTGRES_URI, {
//   dialect: 'postgres',
//   logging: false, // Set to true if you want to log SQL queries
// });
// Initialize models
// Import models
const models = {
  User,
  Post,
  Comment
}

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models)
  }
})
export { sequelize, models }
