import React, { useState } from "react";
import IngredientList from "../IngredientList/IngredientList";
import BurgerView from "../BurgerView/BurgerView";
import "./BurgerBuilder.css";

const BurgerBuilder: React.FC<{ token?: string }> = ({ token }) => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  const addIngredient = (ingredient: any) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <div className="burger-builder flex flex-row justify-between">
      {token && (
        <>
          <IngredientList token={token} addIngredient={addIngredient} />
          <BurgerView
            ingredients={ingredients}
            removeIngredient={removeIngredient}
          />
        </>
      )}
    </div>
  );
};

export default BurgerBuilder;
