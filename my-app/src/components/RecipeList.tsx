import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, setRecipes }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id || null);
    setEditedRecipe(recipe);
  };

  const handleSave = async () => {
    if (editingId && editedRecipe) {
      const recipeDoc = doc(db, "recipes", editingId);
      await updateDoc(recipeDoc, {
        title: editedRecipe.title,
        ingredients: editedRecipe.ingredients,
        steps: editedRecipe.steps,
      });
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === editingId ? { ...recipe, ...editedRecipe } : recipe
        )
      );
      setEditingId(null);
      setEditedRecipe(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleShare = (recipe: Recipe) => {
    const shareText = `Check out this recipe: ${recipe.title}\n\nIngredients:\n${recipe.ingredients.join(
      ", "
    )}\n\nSteps:\n${recipe.steps.join("\n")}`;
    navigator.share
      ? navigator.share({
          title: recipe.title,
          text: shareText,
        })
      : alert("Sharing not supported on this browser!");
  };

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          {editingId === recipe.id ? (
            <>
              <input
                type="text"
                value={editedRecipe?.title || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                value={editedRecipe?.ingredients.join(", ") || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    ingredients: e.target.value.split(",").map((ing) => ing.trim()),
                  })
                }
              />
              <textarea
                value={editedRecipe?.steps.join("\n") || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    steps: e.target.value.split("\n"),
                  })
                }
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Steps:</strong> {recipe.steps.join(". ")}
              </p>
              <button onClick={() => handleEdit(recipe)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id!)}>Delete</button>
              <button onClick={() => handleShare(recipe)}>Share</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;


/*import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, setRecipes }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id || null);
    setEditedRecipe(recipe);
  };

  const handleSave = async () => {
    if (editingId && editedRecipe) {
      const recipeDoc = doc(db, "recipes", editingId);
      await updateDoc(recipeDoc, {
        title: editedRecipe.title,
        ingredients: editedRecipe.ingredients,
        steps: editedRecipe.steps,
      });
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === editingId ? { ...recipe, ...editedRecipe } : recipe
        )
      );
      setEditingId(null);
      setEditedRecipe(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const handleShare = (recipe: Recipe) => {
    const shareText = `Check out this recipe: ${recipe.title}\n\nIngredients:\n${recipe.ingredients.join(", ")}\n\nSteps:\n${recipe.steps.join("\n")}`;

    // Check if the browser supports the Web Share API for native sharing
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: shareText,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      // Create a WhatsApp sharing link
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      
      // Open WhatsApp in a new tab or window
      const whatsappButton = window.confirm("Do you want to share via WhatsApp?");
      if (whatsappButton) {
        window.open(whatsappUrl, "_blank");
      }
    }
  };

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          {editingId === recipe.id ? (
            <>
              <input
                type="text"
                value={editedRecipe?.title || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                value={editedRecipe?.ingredients.join(", ") || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    ingredients: e.target.value.split(",").map((ing) => ing.trim()),
                  })
                }
              />
              <textarea
                value={editedRecipe?.steps.join("\n") || ""}
                onChange={(e) =>
                  setEditedRecipe({
                    ...editedRecipe!,
                    steps: e.target.value.split("\n"),
                  })
                }
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Steps:</strong> {recipe.steps.join(". ")}
              </p>
              <button onClick={() => handleEdit(recipe)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id!)}>Delete</button>
              <button onClick={() => handleShare(recipe)}>Share</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;*/

