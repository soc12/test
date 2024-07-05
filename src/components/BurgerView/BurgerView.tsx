import React from "react";
import "./BurgerView.css";

const BurgerView: React.FC<{
  ingredients: any[];
  removeIngredient: (index: number) => void;
}> = ({ ingredients, removeIngredient }) => {
  return (
    <div className="burger-view w-2/3 relative">
      <div className="top-section">
        <img
          src="https://react-interview.xm.com/img/bun_top.png"
          alt="Top Bun"
          className="bun-top"
          style={{ zIndex: ingredients.length + 1 }}
        />
        {ingredients.length === 0 ? (
          <p className="empty-ingredients">Please select ingredients</p>
        ) : (
          ingredients
            .slice()
            .reverse()
            .map((ingredient, index) => (
              <div
                key={index}
                className="burger-ingredient"
                style={{
                  zIndex: ingredients.length - index,
                  marginBottom:
                    index === ingredients.length - 1 ? "0" : "-40px",
                  marginTop: index === 0 ? "-20px" : "0",
                }}
                onClick={() => removeIngredient(ingredients.length - 1 - index)}
              >
                <img
                  src={`https://react-interview.xm.com/img/${ingredient.src}`}
                  alt={ingredient.name}
                />
              </div>
            ))
        )}
      </div>
      <img
        src="https://react-interview.xm.com/img/bun_bottom.png"
        alt="Bottom Bun"
        className="bun-bottom"
        style={{ marginTop: "-40px" }}
      />
    </div>
  );
};

export default BurgerView;
