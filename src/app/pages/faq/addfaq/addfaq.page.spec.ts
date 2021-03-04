import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddfaqPage } from './addfaq.page';

describe('AddfaqPage', () => {
  let component:AddfaqPage;
  let fixture: ComponentFixture<AddfaqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfaqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddfaqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
