import React from 'react'
import { useSelector } from "react-redux";
import ProductDetailContent from './ProductDetailContent';

const ProjectInfo = () => {
    const { productDetail } = useSelector((state) => state.product);
    console.log(productDetail)
    return (
      <div className="flex w-full bg-white">
        <div className="flex flex-col w-full mt-5 mb-4 overflow-hidden bg-white mx-[73px]  border-b border-dashed border-[#dcdcdc]">
          <div className="p-4 border-b border-dashed border-[#dcdcdc]">
            <h2 className="pt-2 pb-2 pl-4 pr-4 m-0 font-bold text-xl leading-8 capitalize">
              Thông tin sản phẩm{" "}
            </h2>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Năm XB</div>
                <div>{productDetail.publishingYear}</div>
            </div>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Ngôn ngữ</div>
                <div>{productDetail.language}</div>
            </div>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Số trang</div>
                <div>{productDetail.pages}</div>
            </div>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Nhà xuất bản</div>
                <div>{productDetail.publisher}</div>
            </div>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Tác giả</div>
                <div>{productDetail.author}</div>
            </div>
            <div className='flex flex-row ml-4 items-center'>
                <div className='text-[#ababab] min-w-[10rem] py-2'>Hình thức</div>
                <div>{productDetail.form}</div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProjectInfo