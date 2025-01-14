import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';
import { ConfirmService } from '../../../core/services/confirm.service';

interface CourseCategory {
  id: number;
  ct_name: string;
  ct_type: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  styleUrls: ['./course-category-list.component.scss']
})
export class CourseCategoryListComponent implements OnInit {
  categories: CourseCategory[] = [
    {
      id: 1,
      ct_name: 'string-edited',
      ct_type: 0,
      created_at: '2024-12-15 06:36:47.973923',
      updated_at: '2024-12-15 06:36:47.973923'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'ct_name', title: 'Tên danh mục' },
    { key: 'ct_type', title: 'Loại' },
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

  constructor(private confirmService: ConfirmService) { }

  ngOnInit(): void {
    // In real application, we would fetch categories from a service
  }

  async onActionClick(event: {type: string, item: CourseCategory}): Promise<void> {
    switch(event.type) {
      case 'edit':
        // Handle edit
        console.log('Edit category:', event.item);
        break;
      case 'delete':
        const confirmed = await this.confirmService.confirm({
          title: 'Xóa danh mục',
          text: 'Bạn có chắc chắn muốn xóa danh mục này không?'
        });

        if (confirmed) {
          try {
            this.deleteCategory(event.item.id);
            await this.confirmService.success({
              text: 'Xóa danh mục thành công!'
            });
          } catch (error) {
            await this.confirmService.error({
              text: 'Có lỗi xảy ra khi xóa danh mục!'
            });
          }
        }
        break;
    }
  }

  private deleteCategory(id: number): void {
    this.categories = this.categories.filter(category => category.id !== id);
  }
}
