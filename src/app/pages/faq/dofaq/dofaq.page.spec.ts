import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DofaqPage } from './dofaq.page';

describe('DofaqPage', () => {
  let component:DofaqPage;
  let fixture: ComponentFixture<DofaqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DofaqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DofaqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
