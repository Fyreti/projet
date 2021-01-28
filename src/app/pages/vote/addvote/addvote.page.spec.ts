import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddvotePage } from './addvote.page';

describe('AddvotePage', () => {
  let component:AddvotePage;
  let fixture: ComponentFixture<AddvotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddvotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
