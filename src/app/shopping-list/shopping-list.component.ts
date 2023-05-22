import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy{
// @ViewChild("shoppingListAmount", {static:true}) shoppingListAmount: ElementRef;
// @ViewChild("shoppingListInput", {static:true}) shoppingListContent: ElementRef;

  ingredients: Ingredient[];
  private igChangeSub: Subscription; 

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredinets();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);  
  }

  ngOnDestroy(): void {
   this.igChangeSub.unsubscribe(); 
  }

}
 