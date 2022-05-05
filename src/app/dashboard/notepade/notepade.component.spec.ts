import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadeComponent } from './notepade.component';

describe('NotepadeComponent', () => {
  let component: NotepadeComponent;
  let fixture: ComponentFixture<NotepadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
