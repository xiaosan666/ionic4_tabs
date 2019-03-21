import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2Page } from './test2.page';

describe('Test2Page', () => {
  let component: Test2Page;
  let fixture: ComponentFixture<Test2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
