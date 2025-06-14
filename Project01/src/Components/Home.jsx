import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { search } = useLocation();

  const category = React.useMemo(() => {
    try {
      const parts = search?.split("=");
      return parts?.[1] ? decodeURIComponent(parts[1]) : null;
    } catch (e) {
      return null;
    }
  }, [search]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (category) {
        try {
          const { data } = await axios.get(`/products/category/${category}`);
          setFilteredProducts(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setFilteredProducts(products);
      }
    };

    if (products && Array.isArray(products)) {
      fetchFilteredProducts();
    }
  }, [category, products]);

  if (!products || !Array.isArray(products)) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts.map((p) => (
          <Link
            key={p.id}
            to={`/details/${p.id}`}
            className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex-col flex justify-center items-center"
          >
            <div
              className="hover:scale-110 transition-transform duration-300 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <h1 className="text-sm text-center hover:text-black">
              {p.title.length > 50 ? p.title.slice(0, 50) + "..." : p.title}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
