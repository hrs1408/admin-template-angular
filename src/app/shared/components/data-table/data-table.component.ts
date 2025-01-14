import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';

export interface Column {
  key: string;
  title: string;
  type?: 'text' | 'date' | 'status' | 'image' | 'actions';
  statusConfig?: {
    trueValue: string | boolean;
    falseValue: string | boolean;
    trueLabel: string;
    falseLabel: string;
  };
}

export interface Action {
  icon: string;
  title: string;
  type: string;
  customType?: string;
  condition?: (item: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzTagModule
  ]
})
export class DataTableComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() actions: Action[] = [];
  @Output() actionClick = new EventEmitter<{type: string, customType?: string, item: any}>();

  onActionClick(type: string, customType: string | undefined, item: any): void {
    this.actionClick.emit({ type, customType, item });
  }

  getStatusLabel(column: Column, value: any): string {
    if (!column.statusConfig) return value;

    return value === column.statusConfig.trueValue
      ? column.statusConfig.trueLabel
      : column.statusConfig.falseLabel;
  }

  isStatusTrue(column: Column, value: any): boolean {
    return column.statusConfig ? value === column.statusConfig.trueValue : value;
  }

  shouldShowAction(action: Action, item: any): boolean {
    return action.condition ? action.condition(item) : true;
  }
}
