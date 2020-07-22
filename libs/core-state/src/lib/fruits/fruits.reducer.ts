import { Fruit } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as FruitsActions from './fruits.actions';

export const FRUITS_FEATURE_KEY = 'fruit';

export interface FruitsState extends EntityState<Fruit> {
  selectedId?: string | number; // which Fruits record has been selected
  loaded: boolean; // has the Fruits list been loaded
  error?: string | null; // last known error (if any)
}

export interface FruitsPartialState {
  readonly [FRUITS_FEATURE_KEY]: FruitsState;
}

export const fruitAdapter: EntityAdapter<Fruit> = createEntityAdapter();

export const initialFruitsState: FruitsState = fruitAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _fruitsReducer = createReducer(
  initialFruitsState,
  on(FruitsActions.resetFruits, state => fruitAdapter.removeAll(state)),
  on(FruitsActions.resetSelectedFruit, state => Object.assign({}, state, { selectedId: null })),
  on(FruitsActions.selectFruit, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load fruits
  on(
    FruitsActions.loadFruitsSuccess,
    (state, { fruits }) =>
    fruitAdapter.setAll(fruits, { ...state, loaded: true })
  ),
  // Load fruit
  on(
    FruitsActions.loadFruitSuccess,
    (state, { fruit }) =>
    fruitAdapter.upsertOne(fruit, { ...state, loaded: true })
  ),
  // Add fruit
  on(FruitsActions.createFruitSuccess,
    (state, { fruit }) =>
    fruitAdapter.addOne(fruit, state)
  ),
  // Update fruit
  on(FruitsActions.updateFruitSuccess,
    (state, { fruit }) =>
    fruitAdapter.updateOne({ id: fruit.id, changes: fruit }, state)
  ),
  // Delete fruit
  on(FruitsActions.deleteFruitSuccess,
    (state, { fruit }) =>
    fruitAdapter.removeOne(fruit.id, state)
  ),

  // failure actions
  on(
    FruitsActions.deleteFruitFailure,
    FruitsActions.updateFruitFailure,
    FruitsActions.createFruitFailure,
    FruitsActions.loadFruitFailure,
    FruitsActions.loadFruitsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    FruitsActions.loadFruit,
    FruitsActions.loadFruits,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function fruitsReducer(state: FruitsState | undefined, action: Action) {
  return _fruitsReducer(state, action);
}