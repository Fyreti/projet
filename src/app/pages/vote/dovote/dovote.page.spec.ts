import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DovotePage } from './dovote.page';

describe('DovotePage', () => {
  let component:DovotePage;
  let fixture: ComponentFixture<DovotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DovotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DovotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
