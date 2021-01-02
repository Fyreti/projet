import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactMairiePage } from './contact-mairie.page';

describe('ContactMairiePage', () => {
  let component: ContactMairiePage;
  let fixture: ComponentFixture<ContactMairiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMairiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactMairiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
