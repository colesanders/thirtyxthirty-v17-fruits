import { FruitsEntity } from './fruits.models';
import { State, fruitsAdapter, initialState } from './fruits.reducer';
import * as FruitsSelectors from './fruits.selectors';

describe('Fruits Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFruitsId = (it) => it['id'];
  const createFruitsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FruitsEntity);

  let state;

  beforeEach(() => {
    state = {
      fruits: fruitsAdapter.addAll(
        [
          createFruitsEntity('PRODUCT-AAA'),
          createFruitsEntity('PRODUCT-BBB'),
          createFruitsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Fruits Selectors', () => {
    it('getAllFruits() should return the list of Fruits', () => {
      const results = FruitsSelectors.getAllFruits(state);
      const selId = getFruitsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FruitsSelectors.getSelected(state);
      const selId = getFruitsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFruitsLoaded() should return the current 'loaded' status", () => {
      const result = FruitsSelectors.getFruitsLoaded(state);

      expect(result).toBe(true);
    });

    it("getFruitsError() should return the current 'error' state", () => {
      const result = FruitsSelectors.getFruitsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
