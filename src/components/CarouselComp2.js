import React from "react";
import ImageGallery from "react-image-gallery";
import img1 from "../assets/img/1.jpg";
import img2 from "../assets/img/2.jpg";

const CarouselComp2 = () => {
  const images = [
    {
      original: img1,
      thumbnail: img1,
    },
    {
      original: img2,
      thumbnail: img2,
    },
  ];
  return (
    <div className="bg-slate-400">
      <ImageGallery items={images} originalHeight originalWidth />
    </div>
  );
};

export default CarouselComp2;
