import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  order: number;
  createdAt: Date;
}

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  banners: Banner[] = [
    {
      id: 1,
      title: 'Banner 1',
      imageUrl: 'https://example.com/banner1.jpg',
      status: 'active',
      order: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Banner 2',
      imageUrl: 'https://example.com/banner2.jpg',
      status: 'active',
      order: 2,
      createdAt: new Date()
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'title', title: 'Tiêu đề' },
    {
      key: 'imageUrl',
      title: 'Hình ảnh',
      type: 'image'
    },
    { key: 'order', title: 'Thứ tự' },
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
      condition: (banner: Banner) => true
    },
    {
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In real application, we would fetch banners from a service
  }

  onActionClick(event: {type: string, item: Banner}): void {
    switch(event.type) {
      case 'edit':
        // Handle edit
        console.log('Edit banner:', event.item);
        break;
      case 'toggle':
        this.toggleBannerStatus(event.item);
        break;
      case 'delete':
        this.deleteBanner(event.item.id);
        break;
    }
  }

  private toggleBannerStatus(banner: Banner): void {
    banner.status = banner.status === 'active' ? 'inactive' : 'active';
  }

  private deleteBanner(id: number): void {
    this.banners = this.banners.filter(banner => banner.id !== id);
  }
}
