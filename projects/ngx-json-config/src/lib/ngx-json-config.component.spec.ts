import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonConfigComponent } from './ngx-json-config.component';

describe('NgxJsonConfigComponent', () => {
  let component: NgxJsonConfigComponent;
  let fixture: ComponentFixture<NgxJsonConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxJsonConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJsonConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
