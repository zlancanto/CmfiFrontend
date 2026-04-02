import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ROLE_USERS, RoleUser } from '@core/auth/role-user';
import { APP_ENV } from '@core/config/app-env';
import { API_ROUTE_PATHS, toApiUrl } from '@core/http/api-route.constants';
import { ApiError, normalizeApiError } from '@core/http/api-error.model';
import { APP_ROUTE_URLS } from '@core/routing/app-route.constants';
import { AuthApiService } from '@features/auth/auth-api.service';
import { RegisterRequestDto, RegisterResponseDto } from '@features/auth/models/register.dto';

const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{12,}$/;

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value as string | undefined;
  const confirmPassword = control.get('confirmPassword')?.value as string | undefined;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

type RegisterControlName =
  | keyof RegisterRequestDto
  | 'confirmPassword';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, ButtonModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  protected readonly endpoint = toApiUrl(APP_ENV.apiBaseUrl, API_ROUTE_PATHS.auth.register);
  protected readonly roles = ROLE_USERS;
  protected readonly dashboardUrl = APP_ROUTE_URLS.dashboard;
  protected readonly loading = signal(false);
  protected readonly passwordVisible = signal(false);
  protected readonly confirmPasswordVisible = signal(false);
  protected readonly successPayload = signal<RegisterResponseDto | null>(null);
  protected readonly apiError = signal<ApiError | null>(null);
  protected readonly preciseErrorMessages = computed(() => this.collectPreciseErrorMessages());

  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(PASSWORD_COMPLEXITY_REGEX)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(PASSWORD_COMPLEXITY_REGEX)]],
    role: ['CUSTOMER' as RoleUser, [Validators.required]]
  }, {
    validators: passwordMatchValidator
  });

  protected submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.successPayload.set(null);
    this.apiError.set(null);

    const payload: RegisterRequestDto = this.form.getRawValue();
    const registerPayload: RegisterRequestDto = {
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role
    };

    this.authApiService
      .register(registerPayload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.successPayload.set(response);
        },
        error: (httpError: HttpErrorResponse) => {
          this.apiError.set(normalizeApiError(httpError));
        }
      });
  }

  protected hasControlError(controlName: RegisterControlName): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update((value) => !value);
  }

  protected toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible.update((value) => !value);
  }

  protected hasConfirmPasswordMismatch(): boolean {
    const passwordInteracted =
      this.form.controls.password.touched || this.form.controls.password.dirty;
    const confirmInteracted =
      this.form.controls.confirmPassword.touched || this.form.controls.confirmPassword.dirty;

    return (passwordInteracted || confirmInteracted) && this.form.hasError('passwordMismatch');
  }

  private collectPreciseErrorMessages(): string[] {
    const error = this.apiError();
    if (!error) {
      return [];
    }

    const messageSet = new Set<string>();

    if (error.message.trim().length > 0) {
      messageSet.add(error.message.trim());
    }

    for (const fieldError of error.fieldErrors) {
      if (fieldError.message.trim().length > 0) {
        messageSet.add(fieldError.message.trim());
      }
    }

    for (const detailsValue of Object.values(error.details)) {
      if (typeof detailsValue === 'string' && detailsValue.trim().length > 0) {
        messageSet.add(detailsValue.trim());
      }

      if (Array.isArray(detailsValue)) {
        for (const item of detailsValue) {
          if (typeof item === 'string' && item.trim().length > 0) {
            messageSet.add(item.trim());
          }
        }
      }
    }

    return [...messageSet];
  }
}
