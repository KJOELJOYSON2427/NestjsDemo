import { Injectable, NotFoundException } from '@nestjs/common';
import { Post  } from './interfaces/post.interface';
import { NotFoundFilter } from './not-found/not-found.filter';
import { PostEntity } from './postEntity';
import { EntitySchema, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo} from './entities/post.entity';

@Injectable()
export class PostsService {

    constructor (
        @InjectRepository(PostRepo)
        private userRepository: Repository<Post>){

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

    findAll(): Post[] {
        return this.posts;
    }

    findOne(id: number): Post {
        console.log(this.posts);
        
        const singlePost = this.posts.find(post => post.id === id);
        if (!singlePost) {
            throw new NotFoundFilter();

        }
        return singlePost;
    }


    create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
        const newPost: Post = {
            id: this.getCount(),
            ...createPostData,
            createdAt: new Date()
        }
        this.posts.push(newPost)
        return newPost
    }

    private getCount(): number {
        console.log("came");

        return this.posts.length > 0 ?
            Math.max(...this.posts.map(post => post.id)) + 1 :
            1
    }

  
    update(
        id: number,
        updatePostData: Partial<Omit<PostEntity, 'id' | 'createdAt'>>
    ): PostEntity {
        console.log(id);
        
        const postIndex = this.posts.findIndex((post) => post.id === id);
         console.log(postIndex);
         
        if (postIndex === -1) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        // merge old and new data
        const updatedPost = {
            ...this.posts[postIndex],
            ...updatePostData,
            updatedAt: new Date()
        };

        this.posts[postIndex] = updatedPost;

        return new PostEntity(updatedPost);
    }

    remove(
        id: number,

    ): {message:String} {
        const postIndex = this.posts.findIndex((post) => post.id === id);

        if (postIndex === -1) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        
        const updatedPost =this.posts[postIndex];
            

        

        return updatedPost ? {message:"Deleted Successfully"}:{message:"Something went wrong"}
    }

}
