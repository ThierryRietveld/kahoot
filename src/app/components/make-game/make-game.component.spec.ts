import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGameComponent } from './make-game.component';

describe('MakeGameComponent', () => {
  let component: MakeGameComponent;
  let fixture: ComponentFixture<MakeGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
