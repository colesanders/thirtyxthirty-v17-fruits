import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { FruitsComponent } from './fruits.component';
import { FruitsDetailComponent } from './components/fruits-detail/fruits-detail.component';
import { FruitsListComponent } from './components/fruits-list/fruits-list.component';
import { FruitsFacade } from '@thirty/core-state';
import { Fruit } from '@thirty/api-interfaces';

const mockFruitsFacade = {
  loadFruits: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectFruit: (id:string) =>  {
    selectedFruit.id = id;
  }
}

const selectedFruit: Fruit = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockFruit: Fruit = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('FruitsComponent', () => {
  let component: FruitsComponent;
  let fixture: ComponentFixture<FruitsComponent>;
  let de: DebugElement;
  let fruitFacade: FruitsFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: FruitsFacade, useValue: mockFruitsFacade }
      ],
      declarations: [ 
        FruitsComponent,
        FruitsListComponent,
        FruitsDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fruitFacade = de.injector.get(FruitsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockFruit);
    expect(selectedFruit).toMatchObject(mockFruit);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
