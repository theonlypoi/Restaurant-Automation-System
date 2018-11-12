import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientorderComponent } from './ingredientorder.component';

describe('IngredientorderComponent', () => {
  let component: IngredientorderComponent;
  let fixture: ComponentFixture<IngredientorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
