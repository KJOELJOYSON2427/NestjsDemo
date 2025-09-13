import { Injectable } from '@nestjs/common';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  content: string;

  @IsString({ message: 'Author name must be a string' })
  @IsNotEmpty({ message: 'Author name is required' })
  authorName: string;
}
