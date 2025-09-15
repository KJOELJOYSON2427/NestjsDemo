import { Post } from "src/posts/interfaces/post.interface";
import { UserRole } from "../entities/user.entity";

export type Auth ={
   role: UserRole;
    id: number;
    email: string;
    name: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;

}