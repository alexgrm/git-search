import {
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';

export const mockError: HttpErrorResponse = {
  name: 'HttpErrorResponse',
  message: 'Resource Not Found',
  error: '',
  ok: false,
  headers: new HttpHeaders(),
  status: 401,
  statusText: 'ERROR',
  url: 'http://example.com',
  type: HttpEventType.Response,
};
