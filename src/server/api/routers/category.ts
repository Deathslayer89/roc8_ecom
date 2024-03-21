import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { generateOTP } from "~/server/utils";

export const categoryRouter = createTRPCRouter({
    getUserIdByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .query(async ({ input, ctx }) => {
            const { email } = input;
            const user = await ctx.db.user.findUnique({
                where: { email },
                select: { id: true },
            })
            if (!user) {
                throw new Error("user not found");
            }
            return user.id;
        }),
    category: publicProcedure
        .input(z.object({ skip: z.number().min(0).default(0), take: z.number().min(1).max(10).default(6) }))
        .query(async ({ input, ctx }) => {
            const { skip, take } = input;
            const categories = await ctx.db.category.findMany({
                skip, take,
            });
            return categories;
        }),
    userCategories: publicProcedure
        .input(z.object({ userid: z.number() }))
        .query(async ({ input, ctx }) => {
            const { userid } = input;
            const categories = await ctx.db.userCategory.findMany({
                where: { userId: userid },
                include: { category: true },
            })
            return categories;
        }),

    toggleCategory: publicProcedure
        .input(z.object({ userId: z.number(), categoryId: z.number() }))
        .mutation(async ({ input, ctx }) => {
            const { userId, categoryId } = input;
            const user = await ctx.db.userCategory.findUnique({
                where: {
                    userId_categoryId: {
                        userId, categoryId,
                    }
                }
            });

            if (user) {
                await ctx.db.userCategory.delete({
                    where: {
                        userId_categoryId: {
                            userId, categoryId
                        }
                    }
                })
            } else {
                await ctx.db.userCategory.create({
                    data: {
                        userId,
                        categoryId,
                    }
                })
            }
        })
})