import { models } from "../src/models/index.js";

const { Post } = models;

// Define the seedPosts function
export const seedPosts = async () => {
  try {
    // Insert posts into the Posts table
    await Post.bulkCreate([
      {
        title: 'First Post',
        content: 'This is the content of the first post.',
        authorId: 1, // Assuming the first user created in the users seeder has id 1
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Posts_on_the_saltmarsh%2C_Warton_Sands_-_geograph.org.uk_-_1658558.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Second Post',
        content: 'Content of the second post.',
        authorId: 2, // Assuming the second user created in the users seeder has id 2
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Posts_on_the_saltmarsh%2C_Warton_Sands_-_geograph.org.uk_-_1658558.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
    console.log('Posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

// Use ES6 import.meta.url to check if the file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPosts().catch(console.error);
}
