import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setproducts] = useState(null);

  const getproducts = async () => {
    try {
      const { data } = await axios("/products");
      console.log("Fetched products:", data); // ✅ log what you got
      setproducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
