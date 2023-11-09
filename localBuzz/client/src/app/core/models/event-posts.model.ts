import { PostComment } from './comment.model';

export interface EventPost {
  _id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  cost: number;
  description: string;
  organizer: string;
  artists: string;
  category: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
  };
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventPostDetails {
  _id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  cost: number;
  description: string;
  organizer: string;
  artists: string;
  category: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  comments: PostComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventPostUpd {
  title?: string;
  location?: string;
  date?: string;
  time?: string;
  cost?: number;
  description?: string;
  organizer?: string;
  artists?: string;
  category?: string;
}
