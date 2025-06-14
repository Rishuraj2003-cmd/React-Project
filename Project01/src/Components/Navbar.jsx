import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";
const Navbar = () => {
  const [products] = useContext(ProductContext);
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
//   console.log(distinct_category);


  // navbar me color change 
  const color=()=>{
    return`rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`;

  };
//   console.log(color())

  return (
    <nav className="w-[15%] h-full px-5 bg-zinc-50 flex flex-col items-cemter pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-500 text-blue-500"
        href="/create"
      >
        {" "}
        Add New Product
      </a>
      <hr className="w-[100%] my-5 " />
      <h1 className="text-xl px-1 font-semibold mb-3 w-[80%]">
        Category Filter
      </h1>

      <div className="w-[80%]">
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className="mb-3 flex items-center"
          >
            <span style={{backgroundColor:color()}} className="rounded-full mr-2 w-[15px] h-[15px]  "></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
