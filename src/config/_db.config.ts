import { PrismaClient } from '@/generated/prisma';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Database connected!`);
  } catch (error) {
    console.log(`Database Connection failed!`, error);
  }
};
