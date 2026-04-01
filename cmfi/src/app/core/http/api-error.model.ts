import { HttpErrorResponse } from '@angular/common/http';

export interface ApiFieldError {
  field: string;
  message: string;
  rejectedValue: unknown;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  code: string;
  traceId: string;
  fieldErrors: ApiFieldError[];
  details: Record<string, unknown>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;

const asNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

export const normalizeApiError = (error: HttpErrorResponse): ApiError => {
  const payload = isRecord(error.error) ? error.error : {};

  const fieldErrorsPayload = Array.isArray(payload['fieldErrors'])
    ? payload['fieldErrors']
    : [];

  const fieldErrors: ApiFieldError[] = fieldErrorsPayload
    .filter(isRecord)
    .map((item) => ({
      field: asString(item['field']) ?? '',
      message: asString(item['message']) ?? '',
      rejectedValue: item['rejectedValue']
    }));

  const detailsPayload = payload['details'];
  const details = isRecord(detailsPayload) ? detailsPayload : {};

  const messageFromHttpError =
    typeof error.error === 'string' && error.error.trim().length > 0
      ? error.error
      : error.message;

  return {
    timestamp: asString(payload['timestamp']) ?? new Date().toISOString(),
    status: asNumber(payload['status']) ?? error.status,
    error: (asString(payload['error']) ?? error.statusText) || 'Unknown error',
    message: asString(payload['message']) ?? messageFromHttpError,
    path: asString(payload['path']) ?? '',
    code: asString(payload['code']) ?? 'UNKNOWN',
    traceId: asString(payload['traceId']) ?? '',
    fieldErrors,
    details
  };
};
