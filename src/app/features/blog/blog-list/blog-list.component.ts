import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmService } from '../../../core/services/confirm.service';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface BlogPost {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  content: string;
  author: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [
    {
      id: 1,
      title: 'Học tiếng Trung hiệu quả',
      thumbnail: 'https://i.ibb.co/mJXv1dK/2.png',
      summary: 'Các phương pháp học tiếng Trung hiệu quả cho người mới bắt đầu',
      content: 'Nội dung chi tiết về các phương pháp học tiếng Trung...',
      author: 'Admin',
      status: 'published',
      created_at: '2024-12-15 07:25:57.690405',
      updated_at: '2024-12-15 07:25:57.690405'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    {
      key: 'thumbnail',
      title: 'Ảnh bìa',
      type: 'image',
      imageConfig: {
        width: '120px',
        height: '68px',
        borderRadius: '4px'
      }
    },
    { key: 'title', title: 'Tiêu đề' },
    { key: 'summary', title: 'Tóm tắt' },
    { key: 'author', title: 'Tác giả' },
    {
      key: 'status',
      title: 'Trạng thái',
      type: 'status',
      statusConfig: {
        trueValue: 'published',
        falseValue: 'draft',
        trueLabel: 'Đã xuất bản',
        falseLabel: 'Bản nháp'
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
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor(
    private router: Router,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {}

  onAddPost(): void {
    this.router.navigate(['/blogs/create']);
  }

  async onActionClick(event: { type: string; item: any }) {
    if (event.type === 'delete') {
      const confirmed = await this.confirmService.confirm({
        title: 'Xóa bài viết',
        text: 'Bạn có chắc chắn muốn xóa bài viết này không?',
        icon: 'warning'
      });

      if (confirmed) {
        try {
          // Call API to delete
          await this.confirmService.success({
            text: 'Xóa bài viết thành công!'
          });
        } catch (error) {
          await this.confirmService.error({
            text: 'Có lỗi xảy ra khi xóa bài viết!'
          });
        }
      }
    } else if (event.type === 'edit') {
      this.router.navigate(['/blog/edit', event.item.id]);
    }
  }
}
