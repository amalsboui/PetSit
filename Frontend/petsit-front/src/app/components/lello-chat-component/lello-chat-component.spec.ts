import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LelloChatComponent } from './lello-chat-component';

describe('LelloChatComponent', () => {
  let component: LelloChatComponent;
  let fixture: ComponentFixture<LelloChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LelloChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LelloChatComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
