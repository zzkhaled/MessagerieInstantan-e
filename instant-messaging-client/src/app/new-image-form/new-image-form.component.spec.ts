import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImageFormComponent } from './new-image-form.component';

describe('NewImageFormComponent', () => {
  let component: NewImageFormComponent;
  let fixture: ComponentFixture<NewImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewImageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
