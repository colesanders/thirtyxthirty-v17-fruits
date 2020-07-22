import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Fruit } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-fruits-detail',
  templateUrl: './fruits-detail.component.html',
  styleUrls: ['./fruits-detail.component.scss']
})
export class FruitsDetailComponent implements OnInit, OnChanges{
  @Input() fruit: Fruit;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  fruitForm: FormGroup;

  fruitIcons = ['thirty-apple', 'thirty-banana', 'thirty-orange', 'thirty-passion-fruit'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.fruitForm && this.fruit){
      this.fruitForm.patchValue(this.fruit)
    } else if(this.fruitForm){
      this.cancel();
    }
  }

  cancel(){
    this.fruitForm.reset();
    this.fruitForm.value.weight = 0;
  }

  createFormGroup(){
    this.fruitForm = this.formBuilder.group({
      id: [],
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      color: new FormControl('', [
      ]),
      amount: new FormControl('', [
        Validators.required,
      ]),
      icon: new FormControl('', [
        Validators.required,
      ])
    })
  }
}
