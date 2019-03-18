import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinePage } from './mine.page';

describe('MinePage', () => {
  let component: MinePage;
  let fixture: ComponentFixture<MinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
