import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPostsService } from 'src/app/core/services/event-posts.service';
import { EventPostComponent } from '../event-post/event-post.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-event-post-list',
  standalone: true,
  templateUrl: './event-post-list.component.html',
  styleUrls: ['./event-post-list.component.scss'],
  imports: [CommonModule, EventPostComponent],
})
export class EventPostListComponent implements OnInit {
  private eventPostsService = inject(EventPostsService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  currentUser: User = null;

  eventPosts$ = this.eventPostsService.eventPosts$;

  isEditAllowed = false;

  isLikeShown = this.eventPostsService.isLikeShown$;

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig.path === 'event-posts/user') {
      this.currentUser = this.authService.currentUser$.value;
      this.isEditAllowed = true;
    }

    if (this.currentUser) {
      this.eventPostsService.getUserPosts();
    } else {
      this.eventPostsService.getEventPosts();
    }
  }
}
