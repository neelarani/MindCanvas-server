import { prisma } from "@/config";
import { Prisma, User } from "@/generated/prisma";

export const createUser = async (payload: Prisma.UserCreateInput) => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

export const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return result;
};
