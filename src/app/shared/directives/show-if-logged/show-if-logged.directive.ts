import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
  selector: '[appShowIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {
  currentDisplay!: string;

  constructor(
    private el: ElementRef,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.el.nativeElement).display;

    this.userService.getUser().subscribe((user) => {
      if (user) {
        this.renderer.setStyle(
          this.el.nativeElement,
          'display',
          this.currentDisplay
        );
      } else {
        this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      }
    });
  }
}
