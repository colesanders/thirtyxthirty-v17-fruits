import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FRUITS_FEATURE_KEY,
  FruitsState,
  FruitsPartialState,
  fruitAdapter
} from './fruits.reducer';

// Lookup the 'Fruits' feature state managed by NgRx
export const getFruitsState = createFeatureSelector<
  FruitsPartialState,
  FruitsState
>(FRUITS_FEATURE_KEY);

const { selectAll, selectEntities } = fruitAdapter.getSelectors();

export const getFruitsLoaded = createSelector(
  getFruitsState,
  (state: FruitsState) => state.loaded
);

export const getFruitsError = createSelector(
  getFruitsState,
  (state: FruitsState) => state.error
);

export const getAllFruits = createSelector(
  getFruitsState,
  (state: FruitsState) => selectAll(state)
);

export const getFruitsEntities = createSelector(
  getFruitsState,
  (state: FruitsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFruitsState,
  (state: FruitsState) => state.selectedId
);

export const getSelectedFruit = createSelector(
  getFruitsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);