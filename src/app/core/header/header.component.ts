import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user/IUser';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser | null>;

  constructor(userService: UserService) {
    this.user$ = userService.getUser();
  }

  ngOnInit(): void {}
}
