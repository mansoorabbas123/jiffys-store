import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/img/1.jpg";
import img2 from "../../assets/img/2.jpg";

const CarouselComp = () => {
  return (
    <div className="bg-slate-400 row browser-default">
      <Carousel showThumbs={false}>
        <div>
          <img src={img1} />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src={img2} />
          {/* <p className="legend">Legend 2</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
