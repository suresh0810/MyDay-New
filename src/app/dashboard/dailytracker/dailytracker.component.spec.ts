import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailytrackerComponent } from './dailytracker.component';

describe('DailytrackerComponent', () => {
  let component: DailytrackerComponent;
  let fixture: ComponentFixture<DailytrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailytrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailytrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
