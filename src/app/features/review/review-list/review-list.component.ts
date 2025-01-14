import { Component, OnInit } from '@angular/core';
import { Column, Action } from '../../../shared/components/data-table/data-table.component';

interface CustomAction extends Action {
  customType?: string;
}

interface Review {
  id: number;
  student_name: string;
  course_name: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [
    {
      id: 1,
      student_name: 'Nguyễn Văn A',
      course_name: 'Tiếng Trung cơ bản',
      rating: 5,
      comment: 'Khóa học rất hay và bổ ích',
      status: 'pending',
      created_at: '2024-12-15 07:25:57.690405',
      updated_at: '2024-12-15 07:25:57.690405'
    }
  ];

  columns: Column[] = [
    { key: 'id', title: 'ID' },
    { key: 'student_name', title: 'Tên học viên' },
    { key: 'course_name', title: 'Tên khóa học' },
    { key: 'rating', title: 'Đánh giá' },
    { key: 'comment', title: 'Nhận xét' },
    {
      key: 'status',
      title: 'Trạng thái',
      type: 'status',
      statusConfig: {
        trueValue: 'approved',
        falseValue: 'pending',
        trueLabel: 'Đã duyệt',
        falseLabel: 'Chờ duyệt'
      }
    },
    { key: 'created_at', title: 'Ngày tạo', type: 'date' },
    { key: 'updated_at', title: 'Ngày cập nhật', type: 'date' },
    { key: 'actions', title: 'Thao tác', type: 'actions' }
  ];

  actions: CustomAction[] = [
    {
      icon: 'fa-check',
      title: 'Duyệt',
      type: 'custom',
      customType: 'approve',
      condition: (review: Review) => review.status === 'pending'
    },
    {
      icon: 'fa-times',
      title: 'Từ chối',
      type: 'custom',
      customType: 'reject',
      condition: (review: Review) => review.status === 'pending'
    },
    {
      icon: 'fa-trash',
      title: 'Xóa',
      type: 'delete'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // In real application, we would fetch reviews from a service
  }

  onActionClick(event: {type: string, customType?: string, item: Review}): void {
    if (event.type === 'custom') {
      switch(event.customType) {
        case 'approve':
          this.updateReviewStatus(event.item, 'approved');
          break;
        case 'reject':
          this.updateReviewStatus(event.item, 'rejected');
          break;
      }
    } else if (event.type === 'delete') {
      this.deleteReview(event.item.id);
    }
  }

  private updateReviewStatus(review: Review, status: 'approved' | 'rejected'): void {
    review.status = status;
    review.updated_at = new Date().toISOString();
  }

  private deleteReview(id: number): void {
    this.reviews = this.reviews.filter(review => review.id !== id);
  }
}
