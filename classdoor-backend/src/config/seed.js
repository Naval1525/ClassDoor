// Simple seed script for college database
import prisma from "./db.js"


// Indian colleges data
const indianColleges = [
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    website: 'https://home.iitd.ac.in/',
    description: 'Premier engineering institution established in 1961.',
    logoUrl: 'https://example.com/iitd-logo.png'
  },
  {
    name: 'Delhi University',
    location: 'Delhi',
    website: 'http://www.du.ac.in/',
    description: 'Founded in 1922, one of the premier universities in India.',
    logoUrl: 'https://example.com/du-logo.png'
  },
  {
    name: 'Jawaharlal Nehru University',
    location: 'New Delhi, Delhi',
    website: 'https://www.jnu.ac.in/',
    description: 'Known for research in social sciences, established in 1969.',
    logoUrl: 'https://example.com/jnu-logo.png'
  },
  {
    name: 'Indian Institute of Management Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    website: 'https://www.iima.ac.in/',
    description: 'Premier business school established in 1961.',
    logoUrl: 'https://example.com/iima-logo.png'
  },
  {
    name: 'University of Mumbai',
    location: 'Mumbai, Maharashtra',
    website: 'https://mu.ac.in/',
    description: 'One of the oldest universities in India, established in 1857.',
    logoUrl: 'https://example.com/mu-logo.png'
  }
];

// Main function to seed the database
async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // Create each college in the database
    for (const college of indianColleges) {
      await prisma.college.upsert({
        where: {
          name_location: {
            name: college.name,
            location: college.location
          }
        },
        update: college,
        create: college
      });

      console.log(`Added/Updated college: ${college.name}`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedDatabase();