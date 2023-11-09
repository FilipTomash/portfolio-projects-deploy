import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventPostsService } from 'src/app/core/services/event-posts.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  private eventPostsService = inject(EventPostsService);

  commentForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.commentForm = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(240),
      ]),
    });
  }

  onCommentSubmit() {
    this.eventPostsService.createComment(this.commentForm.value.body);
    this.commentForm.reset();
  }
}
