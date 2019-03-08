import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineAboutPage } from './mine-about.page';

describe('MineAboutPage', () => {
  let component: MineAboutPage;
  let fixture: ComponentFixture<MineAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineAboutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
