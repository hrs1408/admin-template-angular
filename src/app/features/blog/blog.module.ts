import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogListComponent
      },
      {
        path: 'create',
        component: BlogFormComponent
      }
    ])
  ]
})
export class BlogModule { }
