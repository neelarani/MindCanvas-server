import { prisma } from '@/config';
import { Post, Prisma } from '@/generated/prisma';
import { boolean } from 'zod';

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
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
  orderBy,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  orderBy?: 'asc' | 'desc';
}) => {
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },

      typeof isFeatured === 'boolean' && { isFeatured },
      tags && tags?.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    include: {
      author: true,
    },
    orderBy: {
      createdAt: orderBy,
    },
  });

  const total = await prisma.post.count({ where });
  return {
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getSinglePost = async (id: number) => {
  return await prisma.$transaction(async tx => {
    await tx.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return await tx.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  });
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
