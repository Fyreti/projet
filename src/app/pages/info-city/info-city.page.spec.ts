import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoCityPage } from './info-city.page';

describe('InfoCityPage', () => {
  let component: InfoCityPage;
  let fixture: ComponentFixture<InfoCityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
