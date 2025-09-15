import { prisma } from '@/config';
import { Prisma } from '@/generated/prisma';

export const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User Not Found!');
  }

  if (password === user.password) {
    return user;
  } else {
    throw new Error('Password is incorrect!');
  }
};

export const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }
  return user;
};
