import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineHomePage } from './mine-home.page';

describe('MineHomePage', () => {
  let component: MineHomePage;
  let fixture: ComponentFixture<MineHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
