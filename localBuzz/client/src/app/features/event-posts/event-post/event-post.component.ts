import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EventPost,
  EventPostDetails,
} from 'src/app/core/models/event-posts.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { EventPostsService } from 'src/app/core/services/event-posts.service';

@Component({
  selector: 'app-event-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-post.component.html',
  styleUrls: ['./event-post.component.scss'],
})
export class EventPostComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private eventPostsService = inject(EventPostsService);

  currentUser: User;

  isLikeDisabled = false;
  // isDislikeDisabled = false;

  @Input() eventPost: EventPost | EventPostDetails;
  @Input() isHoverShadow = true;
  @Input() isEditAllowed = false;
  @Input() isLikeShown: boolean;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
  }

  onPostClick() {
    this.router.navigate(['event-posts', this.eventPost._id]);
    this.isLikeDisabled = true;
  }

  onPostLike(e: Event) {
    e.stopImmediatePropagation();
    if (!this.isLikeDisabled) {
      this.eventPostsService.likePost(this.eventPost._id);
      this.isLikeDisabled = true;
    }
  }
  onPostDislike(e: Event) {
    e.stopImmediatePropagation();
    this.eventPostsService.dislikePost(this.eventPost._id);
    this.isLikeDisabled = true;
  }

  onPostEdit(e: Event) {
    e.stopImmediatePropagation();

    const state: any = this.eventPost;

    this.router.navigate(['event-posts', 'edit'], { state });
  }

  onPostDelete(e: Event) {
    e.stopImmediatePropagation();

    this.eventPostsService.deletePost(this.eventPost._id);
  }
}
