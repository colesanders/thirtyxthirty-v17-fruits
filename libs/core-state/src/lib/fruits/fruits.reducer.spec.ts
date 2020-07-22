import { FruitsEntity } from './fruits.models';
import * as FruitsActions from './fruits.actions';
import { State, initialState, reducer } from './fruits.reducer';

describe('Fruits Reducer', () => {
  const createFruitsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FruitsEntity);

  beforeEach(() => {});

  describe('valid Fruits actions', () => {
    it('loadFruitsSuccess should return set the list of known Fruits', () => {
      const fruits = [
        createFruitsEntity('PRODUCT-AAA'),
        createFruitsEntity('PRODUCT-zzz'),
      ];
      const action = FruitsActions.loadFruitsSuccess({ fruits });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
