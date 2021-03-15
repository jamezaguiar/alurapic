import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '@env/environment';

import { IServerLog } from './server-log';

@Injectable({ providedIn: 'root' })
export class ServerLogService {
  constructor(private http: HttpClient) {}

  log(log: IServerLog) {
    return this.http.post(`${env.LOG_SERVER_URL}/infra/log`, log);
  }
}
