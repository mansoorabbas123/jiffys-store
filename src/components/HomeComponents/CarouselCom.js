import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";

const CarouselComp = () => {
  return (
    <div className="bg-slate-400">
      <Carousel autoPlay showThumbs={false} interval="2000" infiniteLoop>
        <div className="h-full">
          <img src={img1} className="block" style={{ height: "100%" }} />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div className="h-full">
          <img src={img2} className="block" style={{ height: "100%" }} />
          {/* <p className="legend">Legend 2</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
