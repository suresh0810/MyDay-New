import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailytrackerallComponent } from './dailytrackerall.component';

describe('DailytrackerallComponent', () => {
  let component: DailytrackerallComponent;
  let fixture: ComponentFixture<DailytrackerallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailytrackerallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailytrackerallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
