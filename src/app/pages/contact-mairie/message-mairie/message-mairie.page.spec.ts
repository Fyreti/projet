import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageMairiePage } from './message-mairie.page';

describe('ContactMairiePage', () => {
  let component: MessageMairiePage;
  let fixture: ComponentFixture<MessageMairiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMairiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageMairiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
