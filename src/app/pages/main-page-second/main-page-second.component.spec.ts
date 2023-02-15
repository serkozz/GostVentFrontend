import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageSecondComponent } from './main-page-second.component';

describe('MainPageSecondComponent', () => {
  let component: MainPageSecondComponent;
  let fixture: ComponentFixture<MainPageSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageSecondComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
