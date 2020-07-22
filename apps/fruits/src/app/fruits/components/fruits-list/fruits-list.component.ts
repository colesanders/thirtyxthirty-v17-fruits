import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fruit } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-fruits-list',
  templateUrl: './fruits-list.component.html',
  styleUrls: ['./fruits-list.component.scss']
})
export class FruitsListComponent implements OnInit {
  @Input() fruits: [Fruit];
  @Output() selected = new EventEmitter<Fruit>();
  @Output() deleted = new EventEmitter<Fruit>();
  constructor() { }

  ngOnInit(): void {
  }

}
