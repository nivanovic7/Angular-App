import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs-compat";
export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();

    private recipes :Recipe[]= [
        new Recipe(
          "Test recipe",
         "This is a test",
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545",
         [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
       , new Recipe(
          "recipient",
           "Testing something",
            "https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured.jpg",
            [new Ingredient('Milk', 1), new Ingredient('Cookies', 20)])
      ];


      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipe(id: number){
        return this.getRecipes()[id]
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
}