import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportPage } from './search-report-page';

describe('SearchReportPage', () => {
  let component: SearchReportPage;
  let fixture: ComponentFixture<SearchReportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchReportPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchReportPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
