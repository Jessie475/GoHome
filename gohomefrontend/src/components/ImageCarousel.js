import React from 'react';
import Slider from 'react-slick';

function ImageCarousel({ images }) {
    const settings = {
        dots: true,       // 显示点导航
        infinite: true,   // 无限循环
        speed: 500,       // 切换速度
        slidesToShow: 1,  // 每次显示1张图片
        slidesToScroll: 1 // 每次滚动1张图片
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt="Rental" style={{ width: "100%", height: "auto" }} />
                </div>
            ))}
        </Slider>
    );
}

export default ImageCarousel;
