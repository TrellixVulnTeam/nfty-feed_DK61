import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from './Post';
import { Profile } from './Profile';

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.likes)
  owner: Profile;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
