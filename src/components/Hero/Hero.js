import React from 'react'
import Slider from "react-slick";
import hero from '../../assets/images/puc-campus.jpg'
import hero2 from '../../assets/images/puc-campus-2.jpg'
import './hero.css'

const settings = {
    className: "hero-slider",
    dots: false,
    infinite: true,
    arrows: false,
    fade: true,
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
};

export const Hero = () => {
    return (
        <div className='d-none d-sm-block d-md-block position-relative'>
            <Slider {...settings}>
                <div>
                    <img src={hero} alt="hero" width="100%" style={{ height:"calc(800px - 60px)", objectFit: "cover" }} />
                </div>
                {/* <div>
                    <img src={hero2} alt="hero" width="100%" style={{ height:"calc(800px - 60px)", objectFit: "cover" }} />
                </div> */}
            </Slider>
        </div>
    )
}
