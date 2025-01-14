import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReviewListComponent } from './review-list/review-list.component';

@NgModule({
  declarations: [
    ReviewListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewListComponent
      }
    ])
  ]
})
export class ReviewModule { }
