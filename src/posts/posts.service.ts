import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { NotFoundFilter } from './not-found/not-found.filter';
import { PostEntity } from './postEntity';
import { EntitySchema, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostRepo } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { User } from 'src/auth/entities/user.entity';
import { roleHierarchy } from 'src/auth/constants/roleHierarchy';
import { CACHE_MANAGER , Cache} from '@nestjs/cache-manager';
import { FindPostsQueryDto } from './dto/find-post-dto';
import { PaginatedResponse } from 'src/common/interface/paginated.interface';
import { link } from 'fs';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepo)
        private postRepository: Repository<PostRepo>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {

    }

private PostListCacheKey: Set<string> = new Set();

      
         private generatePostsListCacheKey(query:FindPostsQueryDto){
            const {limit=10,page=1, title}=query;
            const key =`page_list_page${page}_limit${limit}_title${title || 'all'}`;
            return key;
         }
    // private static count = 0;
    // private posts: Post[] = [
    //     {
    //         id: 1,
    //         title: "First",
    //         content: "Lest Us Leaser",
    //         authorName: "Abdul",
    //         createdAt: new Date(),


    //     }
    // ]

    async findAll(query: FindPostsQueryDto): Promise<PaginatedResponse<PostRepo>> {
        const key = this.generatePostsListCacheKey(query);
        
        this.PostListCacheKey.add(key);
          const getCachedData =await this.cacheManager.get<PaginatedResponse<PostRepo>>(key);

         if(getCachedData){
            console.log(`Cache Hit-------> Returning post lists from Cache ${key}`);
            return getCachedData;
            
         }
         console.log(`Cache miss--->from key ${key}`);
         const result=await this.findAllWithDataBase(query)
         const {post ,totalItems}=result;
         const totalPages = Math.ceil(totalItems/query.limit);
         const responseResult:PaginatedResponse<PostRepo> ={
              items:post,
              meta:{
                currentPage: query.page,
                itemsPerPage:query.limit,
                itemCount:totalItems,
                totalPages:totalPages,
                hasNextPage:query.page<totalPages ,
                hasPreviousPage:query.page >1
              }

         }

         //save to cache
         await this.cacheManager.set<PaginatedResponse<PostRepo>>(key,responseResult);
         return responseResult;
  
    }


     async findAllWithDataBase(query: FindPostsQueryDto){
       
        const {limit=10, page=1, title} =query;
        const skip =(page-1)*limit;

        const queryBuilder=await this.postRepository.createQueryBuilder("post")
        .leftJoinAndSelect('post.authorName', 'author')
        .skip(skip).take(limit);

        if(title){
            queryBuilder.andWhere(
                'post.title ILIKE :title',{
                    title: `%${title}%`
                }
            )
        }
      
        const [post,count] = await queryBuilder.getManyAndCount()
        
        return {
            post:post,
            totalItems:count
        };

     }
    async findOne(id: number): Promise<PostRepo> {


        // const singlePost = this.posts.find(post => post.id === id);
        // if (!singlePost) {
        //     throw new NotFoundFilter();

        // }
        const post = await this.postRepository.
            createQueryBuilder('post')
            .leftJoinAndSelect('post.authorName', 'authorName')
            .where('post.id = :id', { id })
            .getOne();
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);

        }
        return post;
    }


    async create(createPostData: CreatePostDto, authorName: User): Promise<PostRepo> {
        const newPost = this.postRepository.create({
            title: createPostData.title,
            authorName: authorName,
            content: createPostData.content,
        });

        await this.postRepository.save(newPost);  // inserts into DB
        return newPost; // now contains id, createdAt, etc.
    }

    async createQuery(createPostData: CreatePostDto, authorName: User): Promise<PostRepo> {
        const newPost = {
            title: createPostData.title,
            authorName: authorName,
            content: createPostData.content,
        };

        const result = await this.postRepository
            .createQueryBuilder()
            .insert()
            .into(PostRepo)
            .values(
                newPost
            )
            .returning("*")
            .execute()


        // inserts into DB
        return result.generatedMaps[0] as PostRepo; // now contains id, createdAt, etc.
    }

    // private getCount(): number {
    //     console.log("came");

    //     return this.posts.length > 0 ?
    //         Math.max(...this.posts.map(post => post.id)) + 1 :
    //         1
    // }

    async update(
        id: number,
        updatePostData: UpdatePostDto,
        user: User, // 👈 from @CurrentUser()
    ): Promise<PostEntity> {
        console.log(user.role, "Auuth");
        
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['authorName'], // include relation properly
        });

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        // ✅ Authorization check
        if (user.role !== 'admin' && post.authorName.id !== user.id) {
            throw new ForbiddenException('You can only update your own posts');
        }

        // ✅ Handle author relation update (admin-only normally)
        if (updatePostData.authorName) {
            const newAuthor = await this.userRepository.findOne({
                where: { name: updatePostData.authorName },
            });

            if (!newAuthor) {
                throw new NotFoundException(
                    `User with name ${updatePostData.authorName} not found`,
                );
            }

            post.authorName = newAuthor;
            delete updatePostData.authorName;
        }

        // ✅ Merge other fields
        const { authorName, ...rest } = updatePostData;
        this.postRepository.merge(post, rest);

        const updatedPost = await this.postRepository.save(post);

        return new PostEntity(updatedPost);
    }


    async remove(id: number): Promise<{ message: string }> {
        // 1. Check if the post exists
        const post = await this.postRepository
            .createQueryBuilder("post")
            .where("post.id = :id", { id })
            .getOne();

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        // 2. Delete using QueryBuilder
        await this.postRepository
            .createQueryBuilder()
            .delete()
            .from(PostRepo)
            .where("id = :id", { id })
            .execute();

        // 3. Return confirmation
        return { message: `Post with id ${id} has been removed` };
    }
}
