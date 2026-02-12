import { TestBed } from '@angular/core/testing';

import { LelloChatService } from './lello-chat-service';

describe('LelloChatService', () => {
  let service: LelloChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LelloChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
