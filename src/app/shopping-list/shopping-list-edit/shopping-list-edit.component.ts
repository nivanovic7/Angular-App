import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription"

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static: true}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredinet(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
   this.slForm.reset();
   this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredinet(this.editedItemIndex);
    this.onClear();
  }

  onSubmit(form: NgForm){
   const value = form.value;
   const newIng  = new Ingredient(value.name,value.amount);
   if(this.editMode){
    this.shoppingListService.updateIngredient(this.editedItemIndex, newIng)
   }
   else{
     this.shoppingListService.addIngredient(newIng);
   }
   this.onClear();
  }


}
