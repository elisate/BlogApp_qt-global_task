import { models } from "../src/models/index.js";

const { Comment, Post, User } = models
// Define the seedComments function
export const seedComments = async () => {
  try {
    // Insert comments into the Comments table
    await Comment.bulkCreate([
      {
        content: 'This is a comment on the first post by user 2.',
        postId: 1, // Assuming the first post has id 1
        authorId: 2, // Assuming the second user has id 2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Another comment on the first post by user 1.',
        postId: 1, // Assuming the first post has id 1
        authorId: 1, // Assuming the first user has id 1
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more comments as needed
    ])

    console.log('Comments seeded successfully!')
  } catch (error) {
    console.error('Error seeding comments:', error)
  }
}

// // If this file is run directly, execute the seedComments function
// if (require.main === module) {
//   seedComments().catch(console.error);
// }
