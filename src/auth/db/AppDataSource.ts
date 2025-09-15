
import { Post } from "src/posts/entities/post.entity";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'joel.2427',
  database: 'nestjs',
  entities: [Post, User],
  synchronize: true,
});