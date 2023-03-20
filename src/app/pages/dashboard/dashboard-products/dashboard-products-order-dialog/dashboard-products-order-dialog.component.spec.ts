import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductsOrderDialogComponent } from './dashboard-products-order-dialog.component';

describe('DashboardProductsOrderDialogComponent', () => {
  let component: DashboardProductsOrderDialogComponent;
  let fixture: ComponentFixture<DashboardProductsOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductsOrderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductsOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
