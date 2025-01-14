import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from '../../../core/services/confirm.service';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  avatarPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      avatar: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // Trong thực tế, sẽ lấy thông tin từ API
    const mockUserData = {
      fullName: 'Admin',
      email: 'admin@example.com',
      phone: '0123456789',
      avatar: 'https://i.ibb.co/mJXv1dK/2.png'
    };

    this.profileForm.patchValue(mockUserData);
    this.avatarPreview = mockUserData.avatar;
  }

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Trong thực tế, sẽ upload file lên server
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onUpdateProfile(): Promise<void> {
    if (this.profileForm.valid) {
      try {
        // Trong thực tế, sẽ gọi API để cập nhật thông tin
        console.log('Profile data:', this.profileForm.value);
        await this.confirmService.success({
          text: 'Cập nhật thông tin thành công!'
        });
      } catch (error) {
        await this.confirmService.error({
          text: 'Có lỗi xảy ra khi cập nhật thông tin!'
        });
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  async onChangePassword(): Promise<void> {
    if (this.passwordForm.valid) {
      try {
        // Trong thực tế, sẽ gọi API để đổi mật khẩu
        console.log('Password data:', this.passwordForm.value);
        await this.confirmService.success({
          text: 'Đổi mật khẩu thành công!'
        });
        this.passwordForm.reset();
      } catch (error) {
        await this.confirmService.error({
          text: 'Có lỗi xảy ra khi đổi mật khẩu!'
        });
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Trường này là bắt buộc';
      }
      if (control.errors['email']) {
        return 'Email không hợp lệ';
      }
      if (control.errors['pattern']) {
        return 'Số điện thoại không hợp lệ';
      }
      if (control.errors['minlength']) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }
    return '';
  }

  getPasswordMatchError(): string {
    return this.passwordForm.hasError('mismatch') ? 'Mật khẩu không khớp' : '';
  }
}
