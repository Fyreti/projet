import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultvotePage } from './resultvote.page';

describe('ResultvotePage', () => {
  let component:ResultvotePage;
  let fixture: ComponentFixture<ResultvotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultvotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultvotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
