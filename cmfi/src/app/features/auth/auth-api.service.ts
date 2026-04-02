import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_ENV } from '@core/config/app-env';
import { API_ROUTE_PATHS, toApiUrl } from '@core/http/api-route.constants';
import { RegisterRequestDto, RegisterResponseDto } from '@features/auth/models/register.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = APP_ENV.apiBaseUrl;

  register(payload: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(
      toApiUrl(this.apiBaseUrl, API_ROUTE_PATHS.auth.register),
      payload
    );
  }
}
