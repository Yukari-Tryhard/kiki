import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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

  function searchBookFromImage(imageFile) {
    const apiKey = "AIzaSyBP2obmxNJrMqUEQ8R2jqBXqFLZElGzUYQ";
    const searchEngineId = "872ba8d511e1b45dd";
    const searchURL = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=`;

    const formData = new FormData();
    formData.append("image", imageFile);

    return fetch(searchURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Extract the first image result from the search data
        const imageResult = data.items[0];

        // Extract the title and author from the image result
        const bookTitle = imageResult.title;
        const bookAuthor = imageResult.displayLink;

        // Log the book information to the console
        console.log(`Book title: ${bookTitle}`);
        console.log(`Book author: ${bookAuthor}`);

        return { bookTitle, bookAuthor };
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onSearchByImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      searchBookFromImage(file);
      // setValue(await searchBookFromImage(file));
      // inputRef.current.focus();
    };
    input.click();
  };

  return (
    <div className="tracking-normal grow-[1] shrink-[1] basis-0 rounded-lg">
      <div className="relative flex w-full tracking-normal shadow form">
        <input
          className="tracking-normal border-0 py-0 px-[12px] text-[13px] rounded-tl-[2px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[2px] grow-[1] shrink-[1] basis-0 outline-0 overflow-visible leading-[1.15] m-0"
          type="text"
          placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <button
          className="btn-search tracking-normal cursor-pointer border-0 w-[40px] bg-amber-400 h-[40px] rounded-tl-[0px] rounded-tr-[2px] rounded-br-[2px] rounded-bl-[0px] text-white text-[13px] font-medium outline-0 flex items-center justify-center normal-case overflow-visible leading-[1.15] box-border m-0"
          onClick={() => onSearchByImage()}
        >
          <img
            className="w-[20px] h-[20px] my-0 mr-[8px] ml-0 tracking-normal max-w-full border-none"
            src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-file-upload-icon-png-image_4717174.jpg"
            alt=""
          />
        </button>
        <button
          className="btn-search tracking-normal cursor-pointer border-0 w-[120px] bg-amber-400 h-[40px] rounded-tl-[0px] rounded-tr-[2px] rounded-br-[2px] rounded-bl-[0px] text-white text-[13px] font-medium outline-0 flex items-center justify-center normal-case overflow-visible leading-[1.15] box-border m-0"
          onClick={() => onSearch(value)}
        >
          <img
            className="icon-search w-[20px] h-[20px] my-0 mr-[8px] ml-0 tracking-normal max-w-full border-none"
            src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
            alt=""
          />
          Tìm Kiếm
        </button>
        <div className="absolute flex flex-col justify-center w-full mt-10 tracking-normal bg-white">
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
              ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
