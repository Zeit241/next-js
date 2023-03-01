export interface UserData{
    id: string,
    username: string,
    status: "ACTIVE"|"BANNED"|"FROZEN",
    role: "USER"|"ADMIN"
}