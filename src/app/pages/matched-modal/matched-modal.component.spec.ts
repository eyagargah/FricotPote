import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedModalComponent } from './matched-modal.component';

describe('MatchedModalComponent', () => {
  let component: MatchedModalComponent;
  let fixture: ComponentFixture<MatchedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
