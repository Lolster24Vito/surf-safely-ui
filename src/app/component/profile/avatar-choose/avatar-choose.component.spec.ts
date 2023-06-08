import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarChooseComponent } from './avatar-choose.component';

describe('AvatarChooseComponent', () => {
  let component: AvatarChooseComponent;
  let fixture: ComponentFixture<AvatarChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
