import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { VmessageModule } from '../../shared/components/vmessage/vmessage.module';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
  declarations: [PhotoFormComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, VmessageModule],
})
export class PhotoFormModule {}
