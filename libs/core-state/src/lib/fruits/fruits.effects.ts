import { Injectable } from '@angular/core';
import { FruitsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as FruitsActions from './fruits.actions';
import { Fruit } from '@thirty/api-interfaces';

@Injectable()
export class FruitsEffects {
  @Effect() loadFruits$ = this.actions$.pipe(
    ofType(FruitsActions.loadFruits),
    fetch({
      run: (action) => this.fruitsService.all().pipe(
        map((fruits: Fruit[]) => FruitsActions.loadFruitsSuccess({ fruits }))
      ),
      onError: (action, error) => FruitsActions.loadFruitsFailure({ error })
    })
  );

  @Effect() loadFruit$ = this.actions$.pipe(
    ofType(FruitsActions.loadFruit),
    fetch({
      run: (action) => this.fruitsService.byId(action.fruitId).pipe(
        map((fruit: Fruit) => FruitsActions.loadFruitSuccess({ fruit }))
      ),
      onError: (action, error) => FruitsActions.loadFruitFailure({ error })
    })
  );

  @Effect() createFruit$ = this.actions$.pipe(
    ofType(FruitsActions.createFruit),
    pessimisticUpdate({
      run: (action) => this.fruitsService.create(action.fruit).pipe(
        map((fruit: Fruit) => FruitsActions.createFruitSuccess({ fruit }))
      ),
      onError: (action, error) => FruitsActions.createFruitFailure({ error })
    })
  );

  @Effect() updateFruit$ = this.actions$.pipe(
    ofType(FruitsActions.updateFruit),
    pessimisticUpdate({
      run: (action) => this.fruitsService.update(action.fruit).pipe(
        map((fruit: Fruit) => 
          FruitsActions.updateFruitSuccess({ fruit }))
      ),
      onError: (action, error) => FruitsActions.updateFruitFailure({ error })
    })
  );

  @Effect() deleteFruit$ = this.actions$.pipe(
    ofType(FruitsActions.deleteFruit),
    pessimisticUpdate({
      run: (action) => this.fruitsService.delete(action.fruit.id).pipe(
        map((fruit: Fruit) => FruitsActions.deleteFruitSuccess({ fruit })),
      ),
      onError: (action, error) => FruitsActions.deleteFruitFailure({ error })
    })
  );

  // Effect to refresh the fruit after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(FruitsActions.deleteFruitSuccess, FruitsActions.updateFruitSuccess),
  //   tap(action => {
  //     FruitsActions.loadFruits();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private fruitsService: FruitsService
  ) {}
}