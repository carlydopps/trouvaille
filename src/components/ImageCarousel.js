import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'

export const ImageCarousel = (trips) => {

  // trips.slice(0,3).map(trip => 
  //   <button key={`trip--${trip.id}`} style={{backgroundImage: `url(${trip.cover_img})`}}>
  //       <p>{trip.destinations[0].city}, {trip.destinations[0].state}</p>
  //   </button>)

  return (
    <Carousel>
      {
        trips.slice(0,3).map(trip =>
          <Carousel.Item interval={900} key={`trip--${trip.id}`} className="carousel-item" >
            <img
              className="img-carousel"
              src={trip.cover_img}
              alt="Trip cover image"
            />
          </Carousel.Item>)
      }
      
      {/* <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663907153/Screen_Shot_2022-09-22_at_11.25.03_PM_sj87ga.png"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663908446/Screen_Shot_2022-09-22_at_11.46.18_PM_iqvh00.png"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img
          className="img-carousel"
          src="https://res.cloudinary.com/dupram4w7/image/upload/v1663909476/1_gsrlbx.png"
        />
      </Carousel.Item> */}
    </Carousel>
  );
}
