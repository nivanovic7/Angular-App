import { Ingredient } from "../shared/ingredient.model"
import { Subject } from   'rxjs';

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

        private ingredients: Ingredient[] = [
          new Ingredient("apples", 5),
          new Ingredient("Plums", 13)
      ] 

      deleteIngredinet(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.getIngredinets())
      }

      getIngredinets(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      getIngredinet(index: number){
        return this.getIngredinets()[index];
      }

      updateIngredient(index:number, newIng: Ingredient){
        this.ingredients[index] = newIng;
        this.ingredientsChanged.next(this.getIngredinets())
      }
}