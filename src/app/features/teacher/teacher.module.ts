import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';

@NgModule({
  declarations: [
    TeacherListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeacherListComponent
      }
    ])
  ]
})
export class TeacherModule { }
