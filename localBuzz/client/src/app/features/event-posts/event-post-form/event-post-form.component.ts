import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventPostsService } from 'src/app/core/services/event-posts.service';
import { EventPost } from 'src/app/core/models/event-posts.model';

@Component({
  selector: 'app-event-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-post-form.component.html',
  styleUrls: ['./event-post-form.component.scss'],
})
export class EventPostFormComponent implements OnInit {
  private eventPostsService = inject(EventPostsService);
  private location = inject(Location);

  eventPostForm: FormGroup;

  editPostData = window.history.state as EventPost;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.eventPostForm = new FormGroup({
      title: new FormControl(this.editPostData?.title ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
      ]),
      location: new FormControl(this.editPostData?.location ?? '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl(this.editPostData?.date ?? '', [
        Validators.required,
      ]),
      time: new FormControl(this.editPostData?.time ?? '', [
        Validators.required,
      ]),
      cost: new FormControl(this.editPostData?.cost ?? 0, [
        Validators.required,
        Validators.min(0),
      ]),
      description: new FormControl(this.editPostData?.description ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(360),
      ]),
      organizer: new FormControl(this.editPostData?.organizer ?? 'Public'),
      artists: new FormControl(this.editPostData?.artists ?? 'Not known'),
      category: new FormControl(this.editPostData?.category ?? 'Music'),
    });
  }

  onFormSubmit() {
    console.log('on Submit', this.eventPostForm.value);

    if (this.editPostData._id) {
      this.eventPostsService.updatePost(
        this.editPostData._id,
        this.eventPostForm.value
      );
    } else {
      console.log(
        this.eventPostForm,
        ' Date: ',
        this.eventPostForm.value.date,
        typeof this.eventPostForm.value.date
      );
      console.log(
        this.eventPostForm,
        ' Time: ',
        this.eventPostForm.value.time,
        typeof this.eventPostForm.value.time
      );
      this.eventPostsService.createPost(this.eventPostForm.value);
    }
  }

  goBack() {
    this.location.back();
  }
}
