import { prisma } from '@/config';
import { Post, Prisma } from '@/generated/prisma';

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

export const getAllPosts = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      content: true,
      tags: true,
      author: true,
    },
  });
  return posts;
};

export const getSinglePost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      tags: true,
      author: true,
    },
  });
  return post;
};

export const updatePost = async (
  id: number,
  payload: Prisma.PostUpdateInput
) => {
  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const deletePost = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  return deletedPost;
};
