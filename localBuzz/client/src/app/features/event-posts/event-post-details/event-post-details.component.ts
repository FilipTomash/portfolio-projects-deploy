import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPostsService } from 'src/app/core/services/event-posts.service';
import { ActivatedRoute } from '@angular/router';
import { EventPostComponent } from '../event-post/event-post.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';

@Component({
  selector: 'app-event-post-details',
  standalone: true,
  imports: [
    CommonModule,
    EventPostComponent,
    CommentFormComponent,
    CommentsListComponent,
  ],
  templateUrl: './event-post-details.component.html',
  styleUrls: ['./event-post-details.component.scss'],
})
export class EventPostDetailsComponent implements OnInit {
  private eventPostsService = inject(EventPostsService);
  private route = inject(ActivatedRoute);

  eventPostDetails$ = this.eventPostsService.eventPostDetails$;
  isLikeShown = this.eventPostsService.isLikeShown$;

  ngOnInit(): void {
    const postId = this.route.snapshot.params.id;

    this.eventPostsService.getEventPostDetails(postId);
  }
}
