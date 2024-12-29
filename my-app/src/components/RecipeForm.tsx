import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe } from "../types";

interface RecipeFormProps {
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ setRecipes }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      steps: steps.split("\n"),
    };

    const docRef = await addDoc(collection(db, "recipes"), newRecipe);
    setRecipes((prev) => [...prev, { id: docRef.id, ...newRecipe }]);
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        placeholder="Steps (one per line)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
