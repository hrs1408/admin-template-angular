import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'course-categories',
        loadChildren: () => import('./features/course-category/course-category.module').then(m => m.CourseCategoryModule)
      },
      {
        path: 'banners',
        loadChildren: () => import('./features/banner/banner.module').then(m => m.BannerModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./features/review/review.module').then(m => m.ReviewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
