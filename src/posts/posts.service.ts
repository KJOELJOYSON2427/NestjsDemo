import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { NotFoundFilter } from './not-found/not-found.filter';
import { PostEntity } from './postEntity';
import { EntitySchema, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepo)
        private postRepository: Repository<PostRepo>) {

    }

    private static count = 0;
    private posts: Post[] = [
        {
            id: 1,
            title: "First",
            content: "Lest Us Leaser",
            authorName: "Abdul",
            createdAt: new Date(),


        }
    ]

    async findAll(): Promise<PostRepo[]> {
        return this.postRepository.find();
    }

    async findOne(id: number): Promise<PostRepo> {
        console.log(this.posts);

        // const singlePost = this.posts.find(post => post.id === id);
        // if (!singlePost) {
        //     throw new NotFoundFilter();

        // }
        const post = await this.postRepository.findOneBy({
            id: id
        })
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);

        }
        return post;
    }


    async create(createPostData: CreatePostDto): Promise<PostRepo> {
        const newPost = this.postRepository.create({
            title: createPostData.title,
            authorName: createPostData.authorName,
            content: createPostData.content,
        });

        await this.postRepository.save(newPost);  // inserts into DB
        return newPost; // now contains id, createdAt, etc.
    }

    // private getCount(): number {
    //     console.log("came");

    //     return this.posts.length > 0 ?
    //         Math.max(...this.posts.map(post => post.id)) + 1 :
    //         1
    // }


    async update(id: number, updatePostData: UpdatePostDto): Promise<PostEntity> {
        // 1. Find the post in the DB
        const post = await this.postRepository.findOne({ where: { id } });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }
 for (const [key, value] of Object.entries(updatePostData)) {
    if (value === undefined) continue; // skip unset fields

    switch (key) {
      case 'title':
        post.title = value;
        break;
      case 'content':
        post.content = value;
        break;
      case 'authorName':
        post.authorName = value;
        break;
      default:
        // ignore unknown fields
        break;
    }
  }


        // 3. Save back to DB
        const updatedPost = await this.postRepository.save(post);

        // 4. Return entity wrapper if you’re using `PostEntity`
        return new PostEntity(updatedPost);
    }

    async remove(
        id: number,

    ): Promise<{ message: String }> {
        const postIndex = await this.postRepository.exists({where:{
            id
        }})

        if (!postIndex) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }


        await this.postRepository.delete(id)
      return { message: `Post with id ${id} has been removed` };    }

}
