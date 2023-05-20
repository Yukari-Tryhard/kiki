import React, {useState} from "react";
import { IconStar, IconAddToCart } from "../icons";
import { NavLink } from "react-router-dom";

const ProductCard = ({ thumbnailUrl, name, author, price, id, url }) => {
  var nf = new Intl.NumberFormat();
  const handleAddToCartClick = () => {
    setShowBubble(true);

    // Hide the bubble after 1 second
    setTimeout(() => {
      setShowBubble(false);
    }, 1000);
  };
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div
      key={id}
      to={`/product/${url}`}
      className="flex-1 p-4 m-4 rounded-xl  justify-center items-center flex-col flex"
    >
      <img
        src={`${thumbnailUrl}`}
        alt=""
        className="object-contain h-[fit-content] w-[176px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] "
      />
      <div className="cursor-pointer w-[45px] h-[45px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full backdrop-blur-sm bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.9)] relative top-[-1.5rem] items-center justify-center flex " onClick={handleAddToCartClick}>
        <IconAddToCart className="text-[#10416F]"></IconAddToCart>
      </div>
      <h3 className="mt-[-1rem] mb-1 text-normal leading-5 line-clamp-1 font-semibold text-[#4998E2]">
        {name}
      </h3>
      <h3 className="text-sm mt-1 mb-1 text-xs leading-5 line-clamp-2 text-[#99AFFF]">
        {author}
      </h3>
      
      <div className="flex items-center mt-1 bg-[#4998E2] rounded hover:bg-[#154E84]">
        <NavLink className="text-sm font-normal text-white px-3 py-1.5" to={`product/${url}`}> {nf.format(price)}đ</NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
