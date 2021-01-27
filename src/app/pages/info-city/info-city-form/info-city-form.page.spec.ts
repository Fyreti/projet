import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoCityFormPage } from './info-city-form.page';

describe('InfoCityFormPage', () => {
  let component: InfoCityFormPage;
  let fixture: ComponentFixture<InfoCityFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCityFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCityFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
