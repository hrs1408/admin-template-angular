import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface Course {
  id: number;
  course_name: string;
  description: string;
  course_category: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      course_name: 'string-edited',
      description: 'string',
      course_category: 1,
      created_at: '2024-12-15 07:25:57.690405',
      updated_at: '2024-12-15 07:25:57.690405'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'course_name', title: 'Tên khóa học' },
    { key: 'description', title: 'Mô tả' },
    { key: 'course_category', title: 'Danh mục' },
    { key: 'created_at', title: 'Ngày tạo', type: 'date' },
    { key: 'updated_at', title: 'Ngày cập nhật', type: 'date' },
    { key: 'actions', title: 'Thao tác', type: 'actions' }
  ];

  actions: Action[] = [
    {
      icon: 'fa-edit',
      title: 'Sửa',
      type: 'edit'
    },
    {
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In real application, we would fetch courses from a service
  }

  onActionClick(event: {type: string, item: Course}): void {
    switch(event.type) {
      case 'edit':
        // Handle edit
        console.log('Edit course:', event.item);
        break;
      case 'delete':
        this.deleteCourse(event.item.id);
        break;
    }
  }

  private deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
