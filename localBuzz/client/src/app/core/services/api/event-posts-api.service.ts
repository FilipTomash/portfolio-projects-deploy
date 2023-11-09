import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';
import {
  EventPost,
  EventPostDetails,
  EventPostUpd,
} from '../../models/event-posts.model';
import { PostComment } from '../../models/comment.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class EventPostsApiService {
  private http = inject(HttpClient);

  fetchPosts() {
    return this.http
      .get(`${API_URL}/posts`)
      .pipe(map((value) => value as EventPost[]));
  }

  fetchPostById(postId: string) {
    return this.http
      .get(`${API_URL}/posts/${postId}`)
      .pipe(map((value) => value as EventPostDetails));
  }

  createPost(postData: EventPost) {
    console.log('in the Post Api service');
    return this.http
      .post(`${API_URL}/posts`, postData)
      .pipe(map((value) => value as EventPost));
  }

  createComment(body: string, post: string) {
    return this.http.post(`${API_URL}/comments`, { body, post });
  }

  updatePost(postId: string, updateData: EventPostUpd) {
    return this.http.patch(`${API_URL}/posts/${postId}`, updateData);
  }

  likePost(postId: string) {
    return this.http
      .patch(`${API_URL}/posts/${postId}/like`, null)
      .pipe(map((value) => value as { likes: number }));
  }

  dislikePost(postId: string) {
    return this.http
      .patch(`${API_URL}/posts/${postId}/dislike`, null)
      .pipe(map((value) => value as { dislikes: number }));
  }

  fetchPostsByUser() {
    return this.http
      .get(`${API_URL}/user/posts`)
      .pipe(map((value) => value as EventPost[]));
  }

  fetchCommentsByUser() {
    return this.http
      .get(`${API_URL}/user/comments`)
      .pipe(map((value) => value as PostComment[]));
  }

  deletePost(postId: string) {
    return this.http.delete(`${API_URL}/posts/${postId}`);
  }
  deleteComment(commentId: string) {
    return this.http.delete(`${API_URL}/comments/${commentId}`);
  }
}
