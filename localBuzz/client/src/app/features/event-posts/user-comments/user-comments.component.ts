import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventPostsService } from 'src/app/core/services/event-posts.service';
import { User } from 'src/app/core/models/user.model';
import { CommentsListComponent } from '../comments-list/comments-list.component';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [CommonModule, CommentsListComponent],
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent implements OnInit {
  private authService = inject(AuthService);
  private eventPostsService = inject(EventPostsService);

  userComments$ = this.eventPostsService.userComments$;

  currentUser: User;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
    this.eventPostsService.getUserComments();
  }
}
