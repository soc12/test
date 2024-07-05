import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IngredientList.css";

const IngredientList: React.FC<{
  token: string;
  addIngredient: (ingredient: any) => void;
}> = ({ token, addIngredient }) => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://react-interview.xm.com/ingredients",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIngredients(response.data);
      } catch (err) {
        console.error("Error fetching ingredients", err);
      }
    };
    fetchIngredients();
  }, [token]);

  return (
    <div className="ingredient-list bg-white w-1/3">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Ingredients
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="group relative cursor-pointer"
              onClick={() => addIngredient(ingredient)}
            >
              <div className="w-full border border-gray-300 rounded-md overflow-hidden flex items-center justify-center p-2">
                <img
                  src={`https://react-interview.xm.com/img/${ingredient.src}`}
                  alt={ingredient.name}
                  className="w-2/3 max-h-full"
                />
              </div>
              <div className="mt-2  justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 capitalize">
                    <span className="absolute inset-0" />
                    {ingredient.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
