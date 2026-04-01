import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { APP_ENV } from '../../../core/config/app-env';
import { ApiError, normalizeApiError } from '../../../core/http/api-error.model';
import { AuthApiService } from '../../../features/auth/auth-api.service';
import {
  RegisterRequestDto,
  RegisterResponseDto,
  RegisterRole
} from '../../../features/auth/models/register.dto';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, ButtonModule, RouterLink, JsonPipe],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  protected readonly apiBaseUrl = APP_ENV.apiBaseUrl;
  protected readonly roles: ReadonlyArray<RegisterRole> = ['CUSTOMER', 'ORGANIZER'];
  protected readonly loading = signal(false);
  protected readonly successPayload = signal<RegisterResponseDto | null>(null);
  protected readonly rawSuccessPayload = signal<unknown | null>(null);
  protected readonly apiError = signal<ApiError | null>(null);
  protected readonly rawErrorPayload = signal<unknown | null>(null);
  protected readonly hasResponse = computed(
    () => this.successPayload() !== null || this.apiError() !== null
  );

  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    role: ['CUSTOMER' as RegisterRole, [Validators.required]]
  });

  protected submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.successPayload.set(null);
    this.rawSuccessPayload.set(null);
    this.apiError.set(null);
    this.rawErrorPayload.set(null);

    const payload: RegisterRequestDto = this.form.getRawValue();

    this.authApiService
      .register(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.successPayload.set(response);
          this.rawSuccessPayload.set(response);
        },
        error: (httpError: HttpErrorResponse) => {
          this.apiError.set(normalizeApiError(httpError));
          this.rawErrorPayload.set(httpError.error);
        }
      });
  }

  protected hasControlError(controlName: keyof RegisterRequestDto): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
