import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHandlingComponent } from './user-handling.component';

describe('UserHandlingComponent', () => {
  let component: UserHandlingComponent;
  let fixture: ComponentFixture<UserHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHandlingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
