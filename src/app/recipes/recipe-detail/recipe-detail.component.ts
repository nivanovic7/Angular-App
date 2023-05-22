import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipeDetails: Recipe;
  id: number;
constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router ){}

ngOnInit(): void {
  this.activatedRoute.params
  .subscribe((params: Params) => {
    this.id = +params['id']
    this.recipeDetails = this.recipeService.getRecipe(this.id)
  })
}

onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['recipes']);  
}

onEdit(){
  this.router.navigate(['edit'], {relativeTo: this.activatedRoute})
}
}
