import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  EventPost,
  EventPostDetails,
  EventPostUpd,
} from '../models/event-posts.model';
import { EventPostsApiService } from './api/event-posts-api.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class EventPostsService {
  private eventPostApiService = inject(EventPostsApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  eventPosts$ = new BehaviorSubject<EventPost[]>(null);
  eventPostDetails$ = new BehaviorSubject<EventPostDetails>(null);
  userComments$ = new BehaviorSubject<PostComment[]>(null);
  isLikeShown$ = new BehaviorSubject<boolean>(null);

  getEventPosts() {
    this.eventPostApiService.fetchPosts().subscribe({
      next: (value) => {
        this.eventPosts$.next(value);
        this.isLikeShown$.next(false);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  getEventPostDetails(postId: string, refresh = true) {
    if (refresh) this.eventPostDetails$.next(null);
    this.eventPostApiService.fetchPostById(postId).subscribe({
      next: (value) => {
        this.eventPostDetails$.next(value);
        this.isLikeShown$.next(true);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
        this.router.navigate(['not-found']);
      },
    });
  }

  createPost(postData: EventPost) {
    this.eventPostApiService.createPost(postData).subscribe({
      next: (newPost) => {
        this.notificationService.showSuccess('Event created successfully!');
        this.router.navigate(['event-posts', newPost._id]);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  updatePost(postId: string, updateData: EventPostUpd) {
    this.eventPostApiService.updatePost(postId, updateData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Event updated successfully!');
        this.router.navigate(['event-posts', postId]);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  createComment(body: string) {
    this.eventPostApiService
      .createComment(body, this.eventPostDetails$.value._id)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Comment added successfully!');
          this.getEventPostDetails(this.eventPostDetails$.value._id, false);
        },
        error: (error) => {
          // notification for error
          this.notificationService.showError(error.error.message);
        },
      });
  }

  likePost(postId: string) {
    this.eventPostApiService.likePost(postId).subscribe({
      next: (value) => {
        if (this.eventPostDetails$.value) {
          const post = this.eventPostDetails$.value;

          post.likes = value.likes;

          this.eventPostDetails$.next(post);

          return;
        }

        const posts = this.eventPosts$.value;

        posts.forEach((post) => {
          if (post._id === postId) {
            post.likes = value.likes;
            return;
          }
        });

        this.eventPosts$.next(posts);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  dislikePost(postId: string) {
    this.eventPostApiService.dislikePost(postId).subscribe({
      next: (value) => {
        if (this.eventPostDetails$.value) {
          const post = this.eventPostDetails$.value;

          post.dislikes = value.dislikes;

          this.eventPostDetails$.next(post);

          return;
        }

        const posts = this.eventPosts$.value;

        posts.forEach((post) => {
          if (post._id === postId) {
            post.dislikes = value.dislikes;
            return;
          }
        });
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  getUserPosts() {
    this.eventPosts$.next(null);
    this.eventPostApiService.fetchPostsByUser().subscribe({
      next: (value) => {
        this.eventPosts$.next(value);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  getUserComments() {
    this.userComments$.next(null);
    this.eventPostApiService.fetchCommentsByUser().subscribe({
      next: (value) => {
        this.userComments$.next(value);
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  deletePost(postId: string) {
    this.eventPostApiService.deletePost(postId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Event deleted successfully!');
        this.getUserPosts();
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }
  deleteComment(commentId: string) {
    this.eventPostApiService.deleteComment(commentId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Comment deleted successfully!');
        this.getUserComments();
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }
}
