import { models } from "../src/models/index.js";

const { User } = models;

// Define the seedUsers function
export const seedUsers = async () => {
  try {
    // Hash the passwords for each user
    const adminHashedPassword = await passHashing('admin123');
    const userHashedPassword = await passHashing('user123');
    
    // Bulk create users with unique passwords
    await User.bulkCreate([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: adminHashedPassword,
        profilePicture: 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
        role: 'admin',
        fullNames: "Imanariyobaptiste",
        gender: 'male',
        phoneNumber: '0787795163'
      },
      {
        username: 'user',
        email: 'user@example.com',
        fullNames: "userfull names",
        password: userHashedPassword,
        profilePicture: 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
        role: 'user',
         gender: 'male',
        phoneNumber: '0787795163'
      },
    ]);
    
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Use ES6 import.meta.url to check if the file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsers().catch(console.error);
}
