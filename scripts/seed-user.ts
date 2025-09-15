import { AppDataSource } from 'src/auth/db/AppDataSource';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { DataSource } from 'typeorm';
// your TypeORM DataSource
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    await AppDataSource.initialize(); // connect to DB
    console.log('DataSource initialized');

    const userRepo = AppDataSource.getRepository(User);
    const password = await bcrypt.hash("admin", 10);

    const user = userRepo.create({
      email: 'admin@example.com',
      name:"admin",
      password: password, // hash if needed
      role: UserRole.ADMIN,
    });

    await userRepo.save(user);
    console.log('User inserted:', user);
    await AppDataSource.destroy(); // disconnect
  } catch (err) {
    console.error(err);
  }
}

seed();
