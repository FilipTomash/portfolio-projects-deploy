import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterUserReq } from 'src/app/core/models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);

  registerForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$'),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      this.confirmPasswordValidator
    );
  }

  confirmPasswordValidator = (
    formGroup: any
  ): { passwordMismatch: boolean } | null => {
    if (
      formGroup.controls.password.value !==
      formGroup.controls.confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  };

  onFormSubmit() {
    console.log(
      'From submit btn ',
      this.registerForm,
      'password check: ',
      this.registerForm.controls.password.value
    );

    delete this.registerForm.value.confirmPassword;

    const reqBody: RegisterUserReq = this.registerForm.value;

    this.authService.registerUser(reqBody);
  }
}
