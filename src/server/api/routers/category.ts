import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { generateOTP, hashPassword } from "~/server/utils";

export const categoryRouter = createTRPCRouter({
    category: publicProcedure
        .input(z.object({ skip: z.number().min(0).default(0), take: z.number().min(1).max(10).default(6) }))
        .query(async ({ input, ctx }) => {
            const { skip, take } = input;
            const categories = await ctx.db.category.findMany({
                skip, take,
            });
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
            }else{
                await ctx.db.userCategory.create({
                    data:{
                        userId,
                        categoryId,
                    }
                })
            }
        })
})