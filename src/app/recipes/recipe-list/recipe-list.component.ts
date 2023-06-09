import { Component,  OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.recipes  = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes; 
        console.log(this.recipes)
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(["new"],{relativeTo: this.route} )
  }
  

}
