import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotvalidComponent } from './notvalid.component';

describe('AuthComponent', () => {
  let component: NotvalidComponent;
  let fixture: ComponentFixture<NotvalidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotvalidComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
