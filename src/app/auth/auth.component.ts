import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

import { UserI } from './interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  isSubmitting: boolean = false

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  onSubmit(): void {
    if (this.loginForm.invalid) return
    const user: UserI = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true
    }
    this.authService.login(user).subscribe(response => {
      this.router.navigate(['/questions'])
    })
  }
}
