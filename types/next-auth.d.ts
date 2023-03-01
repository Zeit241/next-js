import {UserData} from "@/types/userdata";

declare module "next-auth/jwt" {
    interface JWT {
       user: UserData
    }
}
declare module "next-auth" {
    interface Session {
        user: UserData
    }
    interface User extends UserData{

    }
}