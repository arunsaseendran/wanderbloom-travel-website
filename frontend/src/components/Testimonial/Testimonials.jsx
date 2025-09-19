import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'
import ava04 from '../../assets/images/ava-4.jpg'

const Testimonials = () => {
    const settings = {
        dots:true,
        infinite: true,
        autoplay:true,
        speed: 1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
            breakpoint:992,
            settings:{
                slidesToShow:2,
                slidesToScroll:1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint:576,
            settings:{
                slidesToShow:1,
                slidesToScroll:1,
            }  ,
        },
    ],
    };
  return (
 <Slider {...settings}>
{/* Review 1 */}
<div className="testimonial py-4 px-3">
<p>
    "This service exceeded my expectations! The process was smooth, 
    the team was very supportive, and I couldn’t be happier with the results."
</p>
<div className="d-flex align-items-center gap-4 mt-3">
<img src={ava01} className='w-25 h-25 rounded-2' alt="" />
<div>
    <h6 className='mb-0 mt-3'>Helvin MG</h6>
    <p>Customer</p>
</div>
</div>
</div>

{/* Review 2 */}
<div className="testimonial py-4 px-3">
<p>
    "Absolutely amazing! I’ve tried other services before but none 
    come close to the professionalism and quality I received here."
</p>
<div className="d-flex align-items-center gap-4 mt-3">
<img src={ava02} className='w-25 h-25 rounded-2' alt="" />
<div>
    <h6 className='mb-0 mt-3'>Aromal KK</h6>
    <p>Customer</p>
</div>
</div>
</div>

{/* Review 3 */}
<div className="testimonial py-4 px-3">
<p>
    "Highly recommend! The staff was super friendly, and everything was 
    delivered on time. Great experience from start to finish."
</p>
<div className="d-flex align-items-center gap-4 mt-3">
<img src={ava04} className='w-25 h-25 rounded-2' alt="" />
<div>
    <h6 className='mb-0 mt-3'>Asbara Ktk</h6>
    <p>Customer</p>
</div>
</div>
</div>

{/* Review 4 */}
<div className="testimonial py-4 px-3">
<p>
    "Fantastic work! I really appreciate the attention to detail and the 
    effort to make sure I was satisfied with everything."
</p>
<div className="d-flex align-items-center gap-4 mt-3">
<img src={ava03} className='w-25 h-25 rounded-2' alt="" />
<div>
    <h6 className='mb-0 mt-3'>Akash C</h6>
    <p>Customer</p>
</div>
</div>
</div>

{/* Review 5 */}
<div className="testimonial py-4 px-3">
<p>
    "Great value for money and outstanding customer support. I’ll definitely 
    be coming back and recommending it to my friends!"
</p>
<div className="d-flex align-items-center gap-4 mt-3">
<img src={ava01} className='w-25 h-25 rounded-2' alt="" />
<div>
    <h6 className='mb-0 mt-3'>Helvin MG</h6>
    <p>Customer</p>
</div>
</div>
</div>

 </Slider>
  )
}

export default Testimonials
