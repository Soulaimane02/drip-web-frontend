import { Role } from "../utils/enums/role";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    rating: number;
    profilePicture: string;
    password?: string;
    role: Role;
}
