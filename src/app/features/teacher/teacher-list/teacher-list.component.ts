import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface Teacher {
  id: number;
  name: string;
  avatar: string;
  description: string;
  experience: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: 'https://i.ibb.co/mJXv1dK/2.png',
      description: 'Giáo viên có nhiều năm kinh nghiệm giảng dạy tiếng Trung',
      experience: '5 năm kinh nghiệm',
      status: 'active',
      created_at: '2024-12-15 07:25:57.690405',
      updated_at: '2024-12-15 07:25:57.690405'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    {
      key: 'avatar',
      title: 'Ảnh đại diện',
      type: 'image',
      imageConfig: {
        width: '60px',
        height: '60px',
        borderRadius: '50%'
      }
    },
    { key: 'name', title: 'Tên giáo viên' },
    { key: 'description', title: 'Giới thiệu' },
    { key: 'experience', title: 'Kinh nghiệm' },
    {
      key: 'status',
      title: 'Trạng thái',
      type: 'status',
      statusConfig: {
        trueValue: 'active',
        falseValue: 'inactive',
        trueLabel: 'Hoạt động',
        falseLabel: 'Không hoạt động'
      }
    },
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
      icon: 'fa-toggle-on',
      title: 'Kích hoạt/Vô hiệu hóa',
      type: 'toggle',
      condition: (teacher: Teacher) => true
    },
    {
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In real application, we would fetch teachers from a service
  }

  onActionClick(event: {type: string, item: Teacher}): void {
    switch(event.type) {
      case 'edit':
        // Handle edit
        console.log('Edit teacher:', event.item);
        break;
      case 'toggle':
        this.toggleTeacherStatus(event.item);
        break;
      case 'delete':
        this.deleteTeacher(event.item.id);
        break;
    }
  }

  private toggleTeacherStatus(teacher: Teacher): void {
    teacher.status = teacher.status === 'active' ? 'inactive' : 'active';
    teacher.updated_at = new Date().toISOString();
  }

  private deleteTeacher(id: number): void {
    this.teachers = this.teachers.filter(teacher => teacher.id !== id);
  }
}
