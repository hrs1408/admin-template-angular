import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';
import { CourseCategoryCreateComponent } from './course-category-create/course-category-create.component';
const routes: Routes = [
  {
    path: '',
    component: CourseCategoryListComponent
  },
  {
    path: 'create',
    component: CourseCategoryCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategoryRoutingModule { }
