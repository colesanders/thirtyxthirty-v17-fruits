import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Fruit } from '@thirty/api-interfaces';

import * as FruitsActions from './fruits.actions';
import * as fromFruits from './fruits.reducer';
import * as FruitsSelectors from './fruits.selectors';

@Injectable({
  providedIn: 'root'
})
export class FruitsFacade {
  loaded$ = this.store.pipe(select(FruitsSelectors.getFruitsLoaded));
  allFruits$ = this.store.pipe(select(FruitsSelectors.getAllFruits));
  selectedFruit$ = this.store.pipe(select(FruitsSelectors.getSelectedFruit));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === FruitsActions.createFruit({} as any).type ||
    action.type === FruitsActions.updateFruit({} as any).type ||
    action.type === FruitsActions.deleteFruit({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectFruit(selectedId: string) {
    this.dispatch(FruitsActions.selectFruit({ selectedId }));
  }

  resetSelectedFruit(){
    this.dispatch(FruitsActions.resetSelectedFruit());
  }

  loadFruits() {
    this.dispatch(FruitsActions.loadFruits());
  }

  loadFruit(fruitId: string) {
    this.dispatch(FruitsActions.loadFruit({ fruitId }));
  }

  createFruit(fruit: Fruit) {
    this.dispatch(FruitsActions.createFruit({ fruit }));
  }

  updateFruit(fruit: Fruit) {
    this.dispatch(FruitsActions.updateFruit({ fruit }));
  }

  deleteFruit(fruit: Fruit) {
    this.dispatch(FruitsActions.deleteFruit({ fruit }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
