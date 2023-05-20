import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosClient, baseURL } from "../../app/axiosClient";

const Search = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const { products } = useSelector((state) => state.product);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchItem) => {
    setValue(searchItem);
    console.log("search ", searchItem);
  };

  async function searchBookFromImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const url = `${baseURL.product}/searchByImage`;
      const response = await axiosClient.post(url,
        formData
      );
      onSearch(response.title)
    } catch (error) {
      // handle errors here
    };
  }

  const onSearchByImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      await searchBookFromImage(file);
      // setValue(await searchBookFromImage(file));
    };
    input.click();
  };

  return (
    <div className="tracking-normal grow-[1] max-w-[611px] shrink-[1] basis-0 rounded-lg">
      <div className="relative flex w-full tracking-normal shadow form bg-white h-[40px] items-center gap-1 pl-2 pr-4 rounded-md">
        <input
          className="tracking-normal border-0 py-0 px-[12px] text-[13px] rounded-tl-[2px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[2px] grow-[1] shrink-[1] basis-0 outline-0 overflow-visible leading-[1.15] m-0"
          type="text"
          placeholder="Tìm kiếm sách"
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <button
          className="btn-search tracking-normal cursor-pointer border-0 w-[30px] bg-[#024E95] h-[30px] rounded-tr-[2px] rounded text-white text-[13px] font-medium outline-0 flex items-center justify-center normal-case overflow-visible leading-[1.15] box-border m-0"
          onClick={() => onSearchByImage()}
        >
          <i className="bi bi-upload"></i>
        </button>
        <button
          className="btn-search tracking-normal cursor-pointer border-0 w-[120px] bg-[#024E95] h-[30px] rounded-tr-[2px] rounded rounded-br-[2px] text-white text-[13px] font-medium outline-0 flex items-center justify-center normal-case overflow-visible leading-[1.15] box-border m-0"
          onClick={() => onSearch(value)}
        >
          <img
            className="icon-search w-[20px] h-[20px] my-0 mr-[8px] ml-0 tracking-normal max-w-full border-none"
            src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
            alt=""
          />
          Tìm Kiếm
        </button>
        <div className="absolute flex flex-col justify-center w-full top-[3rem] tracking-normal bg-white">
          {products &&
            products
              ?.filter((item) => {
                if (value === "") {
                  return "";
                } else if (
                  item.name &&
                  item.name.toLowerCase().includes(value.toLowerCase())
                ) {
                  return item;
                }
                return false;
              })
              .slice(0, 10)
              .map((item, index) => (
                <a
                  className="px-3 py-3 text-sm cursor-pointer text-start font-awesome line-clamp-1 border border-dashed border-[#dcdcdc]"
                  href={`/product/${item.slug}`}
                  onClick={() => onSearch(item.name)}
                  key={index}
                >
                  {item.name}
                </a>
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default Search;
