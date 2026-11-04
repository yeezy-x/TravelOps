import "next-auth"
import { DefaultSession } from "next-auth";

export type UserRole="ADMIN"|"USER"

declare module "next-auth"{
    interface Session{
        user:{
            id:string;
            role:UserRole
        }& DefaultSession["user"]
    }
    interface User{
        role:UserRole
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        role?:UserRole
    }
}

export{}