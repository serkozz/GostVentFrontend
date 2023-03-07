import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminExampleComponent } from './dashboard-admin-example.component';

describe('DashboardAdminExampleComponent', () => {
  let component: DashboardAdminExampleComponent;
  let fixture: ComponentFixture<DashboardAdminExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdminExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
