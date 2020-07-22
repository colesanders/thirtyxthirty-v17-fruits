import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { FruitsEntity } from './fruits.models';
import { FruitsEffects } from './fruits.effects';
import { FruitsFacade } from './fruits.facade';

import * as FruitsSelectors from './fruits.selectors';
import * as FruitsActions from './fruits.actions';
import {
  FRUITS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './fruits.reducer';

interface TestSchema {
  fruits: State;
}

describe('FruitsFacade', () => {
  let facade: FruitsFacade;
  let store: Store<TestSchema>;
  const createFruitsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FruitsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FRUITS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FruitsEffects]),
        ],
        providers: [FruitsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(FruitsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allFruits$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(FruitsActions.loadFruits());

        list = await readFirst(facade.allFruits$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadFruitsSuccess` to manually update list
     */
    it('allFruits$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allFruits$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          FruitsActions.loadFruitsSuccess({
            fruits: [createFruitsEntity('AAA'), createFruitsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allFruits$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
