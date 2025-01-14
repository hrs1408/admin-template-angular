import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BannerFormComponent } from '../banner-form/banner-form.component';
import { ConfirmService } from '../../../core/services/confirm.service';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: string;
  order: number;
  createdAt: Date;
}

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    DataTableComponent
  ]
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

  constructor(
    private modalService: NzModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    // In real application, we would fetch banners from a service
  }

  showBannerModal(banner?: Banner): void {
    const modal = this.modalService.create({
      nzTitle: banner ? 'Chỉnh sửa banner' : 'Thêm banner mới',
      nzContent: BannerFormComponent,
      nzWidth: 800,
      nzData: banner || null,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        if (banner) {
          // Update existing banner
          this.banners = this.banners.map(item =>
            item.id === banner.id ? { ...item, ...result } : item
          );
        } else {
          // Add new banner
          const newBanner = {
            id: Math.max(...this.banners.map(b => b.id)) + 1,
            ...result,
            createdAt: new Date()
          };
          this.banners = [...this.banners, newBanner];
        }
      }
    });
  }

  async onActionClick(event: {type: string, item: Banner}): Promise<void> {
    switch(event.type) {
      case 'edit':
        this.showBannerModal(event.item);
        break;
      case 'toggle':
        this.toggleBannerStatus(event.item);
        break;
      case 'delete':
        const confirmed = await this.confirmService.confirm({
          title: 'Xóa banner',
          text: 'Bạn có chắc chắn muốn xóa banner này không?'
        });

        if (confirmed) {
          try {
            this.deleteBanner(event.item.id);
            await this.confirmService.success({
              text: 'Xóa banner thành công!'
            });
          } catch (error) {
            await this.confirmService.error({
              text: 'Có lỗi xảy ra khi xóa banner!'
            });
          }
        }
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
