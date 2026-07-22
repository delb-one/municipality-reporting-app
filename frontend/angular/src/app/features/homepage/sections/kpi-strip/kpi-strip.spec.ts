import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiStrip } from './kpi-strip';

describe('KpiStrip', () => {
  let component: KpiStrip;
  let fixture: ComponentFixture<KpiStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiStrip],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
