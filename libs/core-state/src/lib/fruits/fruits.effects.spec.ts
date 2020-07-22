import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { FruitsEffects } from './fruits.effects';
import * as FruitsActions from './fruits.actions';

describe('FruitsEffects', () => {
  let actions: Observable<any>;
  let effects: FruitsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FruitsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(FruitsEffects);
  });

  describe('loadFruits$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FruitsActions.loadFruits() });

      const expected = hot('-a-|', {
        a: FruitsActions.loadFruitsSuccess({ fruits: [] }),
      });

      expect(effects.loadFruits$).toBeObservable(expected);
    });
  });
});
