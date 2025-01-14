import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';

@NgModule({
  declarations: [
    CourseCategoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CourseCategoryListComponent
      }
    ])
  ]
})
export class CourseCategoryModule { }
