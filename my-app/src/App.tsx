import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import { Recipe } from "./types";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div>
      <h1>Recipe Application</h1>
      <SearchBar onSearch={handleSearch} />
      <RecipeForm setRecipes={setRecipes} />
      <RecipeList recipes={filteredRecipes} setRecipes={setRecipes} />
    </div>
  );
};

export default App;
