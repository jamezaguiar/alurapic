import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  photos: { url: string; description: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ url: string; description: string }[]>(
        'http://localhost:3000/flavio/photos'
      )
      .subscribe((photos) => {
        this.photos = photos;
        console.log(this.photos);
      });
  }
}
