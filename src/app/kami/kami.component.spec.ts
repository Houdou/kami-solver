import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KamiComponent } from './kami.component';

describe('KamiComponent', () => {
  let component: KamiComponent;
  let fixture: ComponentFixture<KamiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KamiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
