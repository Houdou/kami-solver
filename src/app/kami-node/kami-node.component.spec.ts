import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KamiNodeComponent } from './kami-node.component';

describe('KamiNodeComponent', () => {
  let component: KamiNodeComponent;
  let fixture: ComponentFixture<KamiNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KamiNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KamiNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
