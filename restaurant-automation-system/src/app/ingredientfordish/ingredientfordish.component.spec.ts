import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientfordishComponent } from './ingredientfordish.component';

describe('IngredientfordishComponent', () => {
  let component: IngredientfordishComponent;
  let fixture: ComponentFixture<IngredientfordishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientfordishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientfordishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
