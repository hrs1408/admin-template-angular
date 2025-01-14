import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Column {
  key: string;
  title: string;
  type?: 'text' | 'date' | 'status' | 'actions' | 'image';
  dateFormat?: string;
  statusConfig?: {
    trueValue: string;
    falseValue: string;
    trueLabel: string;
    falseLabel: string;
  };
  imageConfig?: {
    width?: string;
    height?: string;
    borderRadius?: string;
  };
}

export interface Action {
  icon: string;
  title: string;
  type: 'edit' | 'delete' | 'toggle' | 'custom';
  color?: string;
  condition?: (item: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() actions: Action[] = [];

  @Output() actionClick = new EventEmitter<{ type: string; item: any }>();

  onActionClick(type: string, item: any): void {
    this.actionClick.emit({ type, item });
  }

  getValue(item: any, column: Column): any {
    const value = item[column.key];

    if (column.type === 'status') {
      const config = column.statusConfig;
      if (config) {
        return value === config.trueValue
          ? config.trueLabel
          : config.falseLabel;
      }
    }

    return value;
  }

  getStatusClass(item: any, column: Column): string {
    if (column.type === 'status' && column.statusConfig) {
      return item[column.key] === column.statusConfig.trueValue
        ? 'active'
        : 'inactive';
    }
    return '';
  }

  getImageStyle(column: Column): any {
    if (column.type === 'image' && column.imageConfig) {
      return {
        width: column.imageConfig.width || '50px',
        height: column.imageConfig.height || '50px',
        borderRadius: column.imageConfig.borderRadius || '4px',
        objectFit: 'cover',
      };
    }
    return {};
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://i.ibb.co/mJXv1dK/2.png';
    }
  }
}
