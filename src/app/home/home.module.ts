import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';

import { VmessageModule } from '../shared/components/vmessage/vmessage.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';

import { SignupService } from './signup/signup.service';

@NgModule({
  declarations: [SigninComponent, SignupComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    RouterModule,
    VmessageModule,
  ],
  providers: [SignupService],
})
export class HomeModule {}
