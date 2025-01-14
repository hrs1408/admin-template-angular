import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryFormComponent } from './course-category-form.component';

describe('CourseCategoryFormComponent', () => {
  let component: CourseCategoryFormComponent;
  let fixture: ComponentFixture<CourseCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
