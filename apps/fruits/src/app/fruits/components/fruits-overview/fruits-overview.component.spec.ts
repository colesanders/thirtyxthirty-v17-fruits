import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { FruitsOverviewComponent } from './fruits-overview.component';
import { FruitsFacade, selectFruit } from '@thirty/core-state';

const mockFruitsFacade = {
  loadFruits: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectFruit: (id:string) => {}
}

describe('FruitsOverviewComponent', () => {
  let component: FruitsOverviewComponent;
  let fixture: ComponentFixture<FruitsOverviewComponent>;
  let de: DebugElement;
  let fruitFacade: FruitsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitsOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: FruitsFacade, useValue: mockFruitsFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitsOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fruitFacade = de.injector.get(FruitsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(fruitFacade.selectFruit).toBeCalled();
  // });

});
