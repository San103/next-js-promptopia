import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/users';
import { connectToDB } from '@utils/database';

console.log('process.env.GOOGLE_CLIENT_SECRET');
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.emaill
        })

        session.user.id = sessionUser._is.toString();

        return session;
    },
    async signIn({profile}){
        try{
            await connectToDB();
            const userExists = await User.findOne({
                email: profile.email
            });
            if(!userExists){
                await User.create({
                    email:profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        }catch(error){
            console.log(error)
            return false;
        }
    }
})

export {handler as GET, handler as POST };