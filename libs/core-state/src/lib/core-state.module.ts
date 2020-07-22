import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFruits from './fruits/fruits.reducer';
import { FruitsEffects } from './fruits/fruits.effects';
import { FruitsFacade } from './fruits/fruits.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFruits.FRUITS_FEATURE_KEY,
      fromFruits.fruitsReducer
    ),
    EffectsModule.forFeature([FruitsEffects]),
  ],
  providers: [FruitsFacade],
})
export class CoreStateModule {}
