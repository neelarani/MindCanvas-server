import { prisma } from '@/config';
import { Post } from '@/generated/prisma';
import { Prisma } from '@prisma/client';

export const createPost = async (
  payload: Prisma.PostCreateInput
): Promise<Post> => {
  const createdPost = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return createdPost;
};
