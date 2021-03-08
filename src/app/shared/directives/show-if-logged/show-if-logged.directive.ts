import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
  selector: '[appShowIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
