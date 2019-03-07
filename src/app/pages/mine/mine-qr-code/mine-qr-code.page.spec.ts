import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineQrCodePage } from './mine-qr-code.page';

describe('MineQrCodePage', () => {
  let component: MineQrCodePage;
  let fixture: ComponentFixture<MineQrCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineQrCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineQrCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
