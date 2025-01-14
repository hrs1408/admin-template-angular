import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit, OnDestroy {
  blogForm: FormGroup;
  editor: Editor | null = null;
  isSubmitting = false;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = new Editor();
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.blogForm.patchValue({ thumbnail: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.isSubmitting = true;
      console.log('Form data:', this.blogForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/blog']);
      }, 1000);
    } else {
      Object.keys(this.blogForm.controls).forEach(key => {
        const control = this.blogForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.blogForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/blog']);
  }
}
