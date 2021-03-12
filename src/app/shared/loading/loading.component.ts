import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  loading$!: Observable<string>;
  loadingValue: string = 'stopped';

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading().pipe(
      map((loadingType) => {
        this.loadingValue = loadingType.valueOf();
        return this.loadingValue;
      })
    );
  }
}
