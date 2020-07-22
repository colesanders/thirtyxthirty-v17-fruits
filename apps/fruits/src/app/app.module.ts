import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromFruits from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { FruitsComponent } from './fruits/fruits.component';
import { FruitsOverviewComponent } from './fruits/components/fruits-overview/fruits-overview.component';
import { FruitsDetailComponent } from './fruits/components/fruits-detail/fruits-detail.component';
import { FruitsListComponent } from './fruits/components/fruits-list/fruits-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';



@NgModule({
  declarations: [
    AppComponent,
    FruitsComponent,
    FruitsOverviewComponent,
    FruitsDetailComponent,
    FruitsListComponent,
    FourOhFourComponent,
    FruitsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromFruits.fruitsReducer, {}),
    EffectsModule.forRoot([fromFruits.FruitsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


