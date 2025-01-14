import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor() {}

  async confirm(options: {
    title?: string;
    text: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  }) {
    const result = await Swal.fire({
      title: options.title || 'Xác nhận',
      text: options.text,
      icon: options.icon || 'warning',
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Đồng ý',
      cancelButtonText: options.cancelButtonText || 'Hủy',
      confirmButtonColor: '#9066cc',
      cancelButtonColor: '#6e7881',
      reverseButtons: true
    });

    return result.isConfirmed;
  }

  async success(options: { title?: string; text: string }) {
    await Swal.fire({
      title: options.title || 'Thành công',
      text: options.text,
      icon: 'success',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#9066cc'
    });
  }

  async error(options: { title?: string; text: string }) {
    await Swal.fire({
      title: options.title || 'Lỗi',
      text: options.text,
      icon: 'error',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#9066cc'
    });
  }
}
