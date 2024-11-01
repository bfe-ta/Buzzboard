import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBoardComponent } from './dashboard-board.component';

describe('DashboardBoardComponent', () => {
  let component: DashboardBoardComponent;
  let fixture: ComponentFixture<DashboardBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
