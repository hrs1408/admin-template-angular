import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConfirmService } from '../../../core/services/confirm.service';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface Teacher {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  status: string;
  createdAt: Date;
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
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      avatarUrl: 'https://example.com/avatar1.jpg',
      bio: 'Giáo viên tiếng Trung với 5 năm kinh nghiệm',
      status: 'active',
      createdAt: new Date()
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      avatarUrl: 'https://example.com/avatar2.jpg',
      bio: 'Giáo viên tiếng Trung với 3 năm kinh nghiệm',
      status: 'active',
      createdAt: new Date()
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'fullName', title: 'Họ và tên' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Số điện thoại' },
    {
      key: 'avatarUrl',
      title: 'Ảnh đại diện',
      type: 'image'
    },
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
    { key: 'createdAt', title: 'Ngày tạo', type: 'date' },
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

  constructor(
    private modalService: NzModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    // In real application, we would fetch teachers from a service
  }

  showTeacherModal(teacher?: Teacher): void {
    const modal = this.modalService.create({
      nzTitle: teacher ? 'Chỉnh sửa giáo viên' : 'Thêm giáo viên mới',
      nzContent: TeacherFormComponent,
      nzWidth: 800,
      nzData: teacher || null,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        if (teacher) {
          // Update existing teacher
          this.teachers = this.teachers.map(item =>
            item.id === teacher.id ? { ...item, ...result } : item
          );
        } else {
          // Add new teacher
          const newTeacher = {
            id: Math.max(...this.teachers.map(t => t.id)) + 1,
            ...result,
            createdAt: new Date()
          };
          this.teachers = [...this.teachers, newTeacher];
        }
      }
    });
  }

  async onActionClick(event: {type: string, item: Teacher}): Promise<void> {
    switch(event.type) {
      case 'edit':
        this.showTeacherModal(event.item);
        break;
      case 'toggle':
        this.toggleTeacherStatus(event.item);
        break;
      case 'delete':
        const confirmed = await this.confirmService.confirm({
          title: 'Xóa giáo viên',
          text: 'Bạn có chắc chắn muốn xóa giáo viên này không?'
        });

        if (confirmed) {
          try {
            this.deleteTeacher(event.item.id);
            await this.confirmService.success({
              text: 'Xóa giáo viên thành công!'
            });
          } catch (error) {
            await this.confirmService.error({
              text: 'Có lỗi xảy ra khi xóa giáo viên!'
            });
          }
        }
        break;
    }
  }

  private toggleTeacherStatus(teacher: Teacher): void {
    teacher.status = teacher.status === 'active' ? 'inactive' : 'active';
  }

  private deleteTeacher(id: number): void {
    this.teachers = this.teachers.filter(teacher => teacher.id !== id);
  }
}
