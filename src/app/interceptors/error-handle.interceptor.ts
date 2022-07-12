import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error Message: ${error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status}, Error Message: ${error.message}`;
        }

        this.toastr.error(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
