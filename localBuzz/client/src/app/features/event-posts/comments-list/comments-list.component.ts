import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from 'src/app/core/models/comment.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventPostsService } from 'src/app/core/services/event-posts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {
  @Input() comments: PostComment[];
  @Input() showPostLink: boolean = false;

  private eventPostsService = inject(EventPostsService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  currentUser: User;

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig.path === 'event-posts/user/comments') {
      this.currentUser = this.authService.currentUser$.value;
    }
  }

  onCommentDelete(commentId: string) {
    this.eventPostsService.deleteComment(commentId);
  }
}
