/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    //  await prisma.user.deleteMany();
    //  await prisma.potentialUser.deleteMany();
    // await prisma.category.deleteMany();
    // await prisma.userCategory.deleteMany();
    const uniqueProductNames = new Set();


    while (uniqueProductNames.size < 100) {
      const productName = faker.company.name()
      console.log(productName);
      uniqueProductNames.add(productName);
      console.log(uniqueProductNames.size)
    }

    const products = Array.from(uniqueProductNames).map((name) => ({
      name,
    }));

    await prisma.category.createMany({
      data: products,
    });

    console.log('Seeded 100 unique product names successfully!');
  } catch (error) {
    console.error('Error seeding product names:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();