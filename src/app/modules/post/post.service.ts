import { prisma } from '@/config';
import { Post, Prisma } from '@/generated/prisma';
import { boolean } from 'zod';
import { catchAsync } from '@/shared';

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
  if (!id) throw new Error('Post ID is required');
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
        author: {
          select: {
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
          },
        },
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

export const getBlogStat = async () => {
  return await prisma.$transaction(async tx => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: {
        isFeatured: true,
      },
      orderBy: { views: 'desc' },
    });

    const lastweek = new Date();
    lastweek.setDate(lastweek.getDate() - 7);

    const lastWeekPost = await tx.post.count({
      where: {
        createdAt: {
          gte: lastweek,
        },
      },
    });
    return {
      stats: {
        totalPosts: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        minViews: aggregates._min.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
      lastWeekPost,
    };
  });
};
