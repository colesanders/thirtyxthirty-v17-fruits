import { Fruit } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedFruit = createAction('[Fruits] Reset Selected Fruit');
export const resetFruits = createAction('[Fruits] Reset Fruits');

// Select Fruit
export const selectFruit = createAction(
  '[Fruits] Select Fruit',
  props<{ selectedId: string }>()
);

// Load Fruits
export const loadFruits = createAction('[Fruits] Load Fruits');

export const loadFruitsSuccess = createAction(
  '[Fruits] Load Fruits Success',
  props<{ fruits: Fruit[] }>()
);

export const loadFruitsFailure = createAction(
  '[Fruits] Load Fruits Failure',
  props<{ error: any }>()
);

// Load Fruit
export const loadFruit = createAction(
  '[Fruits] Load Fruit',
  props<{ fruitId: string }>()
);

export const loadFruitSuccess = createAction(
  '[Fruits] Load Fruit Success',
  props<{ fruit: Fruit }>()
);

export const loadFruitFailure = createAction(
  '[Fruits] Load Fruit Failure',
  props<{ error: any }>()
);

// Create Fruit
export const createFruit = createAction(
  '[Fruits] Create Fruit',
  props<{ fruit: Fruit }>()
);

export const createFruitSuccess = createAction(
  '[Fruits] Create Fruit Success',
  props<{ fruit: Fruit }>()
);

export const createFruitFailure = createAction(
  '[Fruits] Create Fruit Failure',
  props<{ error: any }>()
);

// Update Fruit
export const updateFruit = createAction(
  '[Fruits] Update Fruit',
  props<{ fruit: Fruit }>()
);

export const updateFruitSuccess = createAction(
  '[Fruits] Update Fruit Success',
  props<{ fruit: Fruit }>()
);

export const updateFruitFailure = createAction(
  '[Fruits] Update Fruit Failure',
  props<{ error: any }>()
);

// Delete Fruit
export const deleteFruit = createAction(
  '[Fruits] Delete Fruit',
  props<{ fruit: Fruit }>()
);

export const deleteFruitCancelled = createAction(
  '[Fruits] Delete Fruit Cancelled'
);

export const deleteFruitSuccess = createAction(
  '[Fruits] Delete Fruit Success',
  props<{ fruit: Fruit }>()
);

export const deleteFruitFailure = createAction(
  '[Fruits] Delete Fruit Failure',
  props<{ error: any }>()
);