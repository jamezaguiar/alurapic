import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
})
export class PhotoDetailsComponent implements OnInit {
  photo$!: Observable<Photo>;
  photoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.photoId = params['photoId'];

      this.photo$ = this.photoService.getPhotoDetails(this.photoId);
    });
  }

  remove() {
    this.photoService.deletePhoto(this.photoId).subscribe(
      () => {
        this.alertService.success('Photo removed!', true);
        this.router.navigate(['/user', this.userService.getUserName()]);
      },
      () => {
        this.alertService.warning('Could not delete this photo!', true);
      }
    );
  }
}
