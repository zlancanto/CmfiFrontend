import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_ENV } from '../../core/config/app-env';
import { RegisterRequestDto, RegisterResponseDto } from './models/register.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = APP_ENV.apiBaseUrl.replace(/\/+$/, '');

  register(payload: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.apiBaseUrl}/auth/register`, payload);
  }
}
