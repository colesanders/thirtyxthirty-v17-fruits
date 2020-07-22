import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FruitsFacade } from '@thirty/core-state'
import { Fruit } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { Animations } from './animations';


@Component({
  selector: 'thirty-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.scss'],
  animations: Animations,
})
export class FruitsComponent implements OnInit {
  fruits$: Observable<Fruit[]> = this.fruitFacade.allFruits$;
  fruit$: Observable<Fruit> = this.fruitFacade.selectedFruit$;
  detailOpen = false;

  constructor(
    private fruitFacade: FruitsFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.fruitFacade.loadFruits();
    this.fruitFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Fruit ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.fruitFacade.resetSelectedFruit();
    this.fruitFacade.loadFruits();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(fruit: Fruit): void{
    this.fruitFacade.selectFruit(fruit.id);
    this.focusDetail();
  }

  delete(fruit: Fruit): void{
    this.fruitFacade.deleteFruit(fruit);
  }

  save(fruit: Fruit): void{
    if(fruit.id !== null){
      this.fruitFacade.updateFruit(fruit);
    }else {
      this.fruitFacade.createFruit(fruit);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/fruits']);
    this.fruitFacade.resetSelectedFruit();
  }

}
