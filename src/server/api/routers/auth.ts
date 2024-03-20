import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { generateOTP, hashPassword } from "~/server/utils";

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input;
            const hashedPassword = hashPassword(password);
            const otp = generateOTP();

            const otpVerification = await ctx.db.potentialUser.create({
                data: {
                    name, email, password: hashedPassword, otp
                }
            });


            return otpVerification;
        }),

    verifyOTP: publicProcedure.input(z.object({
        email:z.string().email()
    })).mutation(async ({ctx,input})=>{
        const {email}=input;

        const newuser=await ctx.db.potentialUser.findUnique({
            where:{email}
        });

        if(!newuser){
            throw new Error('Invalid OTP');
        }
        const user=await ctx.db.user.create({
            data:{
                name:newuser.name,
                email:newuser.email,
                password:newuser.password,
            }
        })
        await ctx.db.potentialUser.delete({
            where:{email}
        });
        return user;
    })

        
})