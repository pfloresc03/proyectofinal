import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalardonesComponent } from './galardones.component';

describe('GalardonesComponent', () => {
  let component: GalardonesComponent;
  let fixture: ComponentFixture<GalardonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalardonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalardonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
