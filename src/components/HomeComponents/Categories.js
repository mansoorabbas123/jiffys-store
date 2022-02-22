import React from "react";
import category1 from "../../assets/img/category1.jpg";
import category2 from "../../assets/img/category2.jpg";
import category3 from "../../assets/img/category3.jpg";
import category4 from "../../assets/img/category4.jpg";
import { NavLink } from "react-router-dom";

const Categories = ({ category, idx }) => {
  const categoryImages = [category1, category2, category3, category4];
  const toCapitalize = (word) => {
    const arr = word.split("");
    const capitalizeFirstLetter = arr[0].toUpperCase();
    arr.shift();
    const arrToStr = capitalizeFirstLetter + arr.join("");
    return arrToStr;
  };
  return (
    <NavLink
      to={`/category/${category}`}
      key={category}
      className="border-2 w-80 rounded-md hover:shadow-xl hover:cursor-pointer"
    >
      <div className="mx-auto">
        <img
          src={categoryImages[idx]}
          alt=""
          style={{ height: "16rem", width: "100%" }}
        />
        <h4
          className="p-2 text-white rounded-b-md"
          style={{ backgroundColor: "#b02e46" }}
        >
          {toCapitalize(category)}
        </h4>
      </div>
    </NavLink>
  );
};

export default Categories;
