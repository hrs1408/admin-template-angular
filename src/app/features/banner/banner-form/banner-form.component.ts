import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    NzIconModule,
    NzGridModule
  ]
})
export class BannerFormComponent implements OnInit {
  @Input() data: any;
  bannerForm: FormGroup;
  imageUrl: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private message: NzMessageService
  ) {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required]],
      order: [null, [Validators.required, Validators.min(1)]],
      image: [null, [Validators.required]],
      status: ['active']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.bannerForm.patchValue(this.data);
      this.imageUrl = this.data.imageUrl;
    }
  }

  handleImageChange(info: any): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (img: string) => {
        this.loading = false;
        this.imageUrl = img;
      });
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    // Xử lý logic kiểm tra file
    return false; // Return false để ngăn upload tự động
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  submitForm(): void {
    if (this.bannerForm.valid) {
      const formData = {
        ...this.bannerForm.value,
        imageUrl: this.imageUrl
      };
      this.modal.close(formData);
    } else {
      Object.values(this.bannerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modal.destroy();
  }
}
