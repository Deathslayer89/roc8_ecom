import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { generateOTP } from "~/server/utils";
export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input;
            console.log('in auth')
            const otp = await generateOTP(email);
            
            // const otpVerification = 
            await ctx.db.potentialUser.create({
                data: {
                    name, email, password, otp
                }
            });


            // return otpVerification;
        }),

    verifyOTP: publicProcedure.input(z.object({
        email: z.string(), otp: z.string()
    })).mutation(async ({ ctx, input }) => {
        const { otp, email } = input;

        const newuser = await ctx.db.potentialUser.findUnique({
            where: {
                email
            }
        });

        if (!newuser || newuser.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        const user = await ctx.db.user.create({
            data: {
                name: newuser.name,
                email: newuser.email,
                password: newuser.password,
            }
        })
        await ctx.db.potentialUser.delete({
            where: { email }
        });
        console.log(user);
        return user;
    }),
    validateLogin: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string()
        })).query(async ({ ctx, input }) => {
            const { email, password } = input;
            const currUser = await ctx.db.user.findUnique({
                where: {
                    email
                }
            })
            console.log('in validate logign')
            if (!currUser) {
                console.log('unsuccessfull')
                return false;
            } else {
                if (
                    currUser.password === password) {
                    return true;
                } else {
                    return false;
                }
            }
        })

})