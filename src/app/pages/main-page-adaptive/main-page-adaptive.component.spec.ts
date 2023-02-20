import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAdaptiveComponent } from './main-page-adaptive.component';

describe('MainPageAdaptiveComponent', () => {
  let component: MainPageAdaptiveComponent;
  let fixture: ComponentFixture<MainPageAdaptiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageAdaptiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageAdaptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
