import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);

    const url = location instanceof PathLocationStrategy ? location.path() : '';

    const message = error.message ? error.message : error.toString();

    StackTrace.fromError(error).then((stackFrames) => {
      const stackAsString = stackFrames.map((sf) => sf.toString()).join('\n');
      console.log(message);
      console.log(stackAsString);
      serverLogService
        .log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString,
        })
        .subscribe(
          () => {
            console.log('Error logged on server.');
          },
          (err) => {
            console.log(err);
            console.log('Server log sending fails.');
          }
        );
    });
  }
}
