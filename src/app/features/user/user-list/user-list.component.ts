import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: boolean;
  created_at: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'Admin',
      status: true,
      created_at: '2024-12-15 07:25:57.690405'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'username', title: 'Tên đăng nhập' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Vai trò' },
    {
      key: 'status',
      title: 'Trạng thái',
      type: 'status',
      statusConfig: {
        trueValue: 'true',
        falseValue: 'false',
        trueLabel: 'Hoạt động',
        falseLabel: 'Đã khóa'
      }
    },
    { key: 'created_at', title: 'Ngày tạo', type: 'date' },
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
      title: 'Khóa/Mở khóa',
      type: 'toggle'
    },
    {
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In real application, we would fetch users from a service
  }

  onActionClick(event: {type: string, item: User}): void {
    switch(event.type) {
      case 'edit':
        console.log('Edit user:', event.item);
        break;
      case 'toggle':
        this.toggleUserStatus(event.item);
        break;
      case 'delete':
        this.deleteUser(event.item.id);
        break;
    }
  }

  private toggleUserStatus(user: User): void {
    user.status = !user.status;
  }

  private deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
