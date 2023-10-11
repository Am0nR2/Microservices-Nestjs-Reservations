import { CallHandler, ExecutionContext, ForbiddenException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
       catchError(error => {
        console.log(error)
        if(error.code === 11000){
          throw new ForbiddenException({
            err_message: "Credentials has already been taken...",
            where : error.keyPattern,
            value : error.keyValue,
            status_code : HttpStatus.FORBIDDEN 
          })
        }
        return throwError(()=> error)
       }) 
    );
  }
}
