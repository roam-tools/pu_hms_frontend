import React from 'react'
import Slider from "react-slick";
import hero from '../../assets/images/puc-campus-1.jpg'
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
                {/* <div className='overlay'></div> */}
                <div>
                    <img src={hero} alt="hero" height={300} width="100%" style={{ objectFit: "cover" }} />
                </div>
                <div>
                    <img src={hero2} alt="hero" height={300} width="100%" style={{ objectFit: "cover" }} />
                </div>
            </Slider>
        </div>
    )
}
