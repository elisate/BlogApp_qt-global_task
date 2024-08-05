import Post from "./post.js";

import {sequelize} from '../../config/config.js'
import { Comment } from "./comment.js";
import { User } from "./user.js";

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
