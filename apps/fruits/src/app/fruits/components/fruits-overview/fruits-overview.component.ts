import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruit } from '@thirty/api-interfaces';
import { FruitsFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'thirty-fruits-overview',
  templateUrl: './fruits-overview.component.html',
  styleUrls: ['./fruits-overview.component.scss']
})
export class FruitsOverviewComponent implements OnInit, OnChanges {
  fruit$: Observable<Fruit> = this.fruitFacade.selectedFruit$;


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private fruitFacade: FruitsFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.fruitFacade.mutations$.subscribe((action: any) => this.get());

  }

  ngOnChanges(): void{
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fruitFacade.selectFruit(id);
  }

  close(){
    this.fruitFacade.resetSelectedFruit();
    this.router.navigate(['/fruits']);
  }
}
