import { Exclude, Expose } from 'class-transformer';

export class PostEntity {
  @Expose()
  id?: number;

  @Expose()
  title?: String;

  @Expose()
  content?: String;

  @Exclude() 
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
