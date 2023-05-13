import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconStar } from "../icons";
import { addToCart } from "../../app/features/cartSlice";
import Swal from "sweetalert2";
import IconCartProductDetail from "../icons/IconCartProductDetail";

export default function ProductDetailContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const productChoose = cartItems.find(
    (item) => item._id === productDetail._id
  );
  const [T, setT] = useState(1);
  const showAlert = (quantity) => {
    Swal.fire({
      icon: "error",
      text: `Số lượng còn lại của sản phẩm này là: ${quantity}`,
    });
  };
  function add() {
    if (
      (!productChoose && T < productDetail?.quantity) ||
      (productChoose &&
        T + productChoose?.quantityChoose < productDetail?.quantity)
    ) {
      setT((T) => T + 1);
    } else if (
      (!productChoose && T >= productDetail?.quantity) ||
      (productChoose &&
        T + productChoose?.quantityChoose === productDetail?.quantity)
    ) {
      showAlert(productDetail?.quantity);
    }
  }
  function sub() {
    if (T > 1) {
      setT((T) => T - 1);
    }
  }
  function handleAlterImage(x) {
    let m = document.getElementById(x).src;
    document.getElementById("Big picture").src = m;
  }

  console.log(productDetail.quantity);
  const handleAddToCart = () => {
    if (!userInfo?.user?.name) {
      navigate("/sign-in");
    } else if (
      !productChoose ||
      (productChoose?.quantityChoose < productDetail?.quantity &&
        productChoose?.quantityChoose + T <= productDetail?.quantity)
    )
      dispatch(addToCart({ ...productDetail, quantityChoose: T }));
    else if (
      productChoose?.quantityChoose === productDetail?.quantity ||
      productChoose?.quantityChoose + T > productDetail?.quantity
    ) {
      showAlert(productDetail?.quantity);
    }
  };

  var nf = new Intl.NumberFormat();
  if (Object.keys(productDetail).length === 0) {
    return null;
  }

  return (
    <div className="flex w-full bg-white">
      <div className="flex flex-col w-full px-4 overflow-hidden bg-white select-none mx-[73px] border-b border-dashed border-[#dcdcdc]">
        <div className="grid w-full grid-cols-2 bg-white rounded">
          {/* left detail*/}
          <div className=" p-6 bg-white border-r border-dashed border-[#dcdcdc] w-full grid grid-cols-2">
            <div className="mt-4 mb-0 ml-0 mr-0 basis-full shrink-0 grow-0">
              {/* list chi tiết */}
              <div className="flex flex-col">
                {productDetail.productPictures?.map(
                  (product_detail_img, index) => (
                    <div
                      key={index}
                      className="relative w-16 h-16 mr-3 rounded cursor-pointer hover:border-2 hover:border-blue-500 "
                    >
                      <img
                        //id={product_detail_img.id}
                        //product_detail_img.id
                        id={index}
                        onClick={() => {
                          handleAlterImage(index);
                        }}
                        src={product_detail_img.img}
                        alt=""
                        className="object-cover h-full"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Hinhf to */}
            <div className="">
              <div className="relative text-center h-[300px] grid-cols-4">
                <img
                  id="Big picture"
                  src={productDetail?.productPictures[0]?.img}
                  alt={productDetail.name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* right detail */}
          <div className="w-full px-4 py-6">
            {/* header */}
            <div className="pr-0 pl-7">
              {/* title */}
              <h1 className="w-full mb-8 font-sans text-4xl font-bold leading-8">
                {productDetail.name}
              </h1>
              <div className="grid grid-cols-2 gap-2 mb-8 text-xs font-medium">
                <span>Nhà cung cấp: SaiGon Books</span>
                <span>Tác giả: Aka Akasaka</span>
                <span>Nhà xuất bản: Thế giới</span>
                <span>Hình thức bìa: Bìa mềm</span>
              </div>
              {/* below title */}
              <div className="flex mt-2 mb-8">
                <div className="flex">
                  <IconStar></IconStar>
                  <IconStar></IconStar>
                  <IconStar></IconStar>
                  <IconStar></IconStar>
                  <IconStar></IconStar>
                </div>
              </div>
            </div>
            {/* body */}
            <div className="flex w-full pt-0 pb-0 pl-6 pr-0">
              {/* left */}
              <div className="w-full pr-3 mr-2">
                {/* prize and icon        */}
                <div className="flex flex-col w-full mb-8">
                  <div className="flex justify-center ml-1 mr-2 text-4xl font-medium text-center w-36 whitespace-nowrap text-[#006FD6]">
                    {nf.format(productDetail?.price)}đ
                  </div>
                </div>

                <div className="w-full">
                  <div className="w-full">
                    <div className="w-full mt-2">
                      <div className="flex items-center w-full mt-2 mb-2">
                        <p className="w-20 text-sm font-medium">Số Lượng</p>
                        <button
                          onClick={sub}
                          id="sub"
                          className="border-2 border-Descrip w-7 h-7 hover:border-red-500"
                        >
                          <img
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                            alt="remove-icon"
                            width="20"
                            height="20"
                          />
                        </button>

                        <input
                          id="input"
                          className="w-10 text-center border-2 border-Descrip h-7"
                          type="text"
                          value={T}
                        />

                        <button
                          onClick={add}
                          id="add"
                          className="border-2 border-Descrip w-7 h-7 hover:border-red-500"
                        >
                          <img
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                            alt="add-icon"
                            width="20"
                            height="20"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      className="w-full h-12 max-w-xs text-[#006FD6] bg-white border border-[#4897E0]"
                      onClick={() => handleAddToCart()}
                    >
                      <IconCartProductDetail></IconCartProductDetail>
                      Thêm vào vỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
