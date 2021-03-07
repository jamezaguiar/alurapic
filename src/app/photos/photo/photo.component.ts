import { Component, Input, OnInit } from '@angular/core';

const IMAGES_PATH = 'http://localhost:3000/imgs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  @Input() description = '';

  private _url = '';
  @Input() set url(url: string) {
    if (url.startsWith('data')) {
      this._url = url;
    } else {
      this._url = `${IMAGES_PATH}/${url}`;
    }
  }
  get url() {
    return this._url;
  }

  constructor() {}

  ngOnInit(): void {}
}
