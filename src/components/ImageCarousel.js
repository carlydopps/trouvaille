import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'
import { Link } from 'react-router-dom';

export const ImageCarousel = ({trips}) => {

  return (
    <Carousel>
      {
        trips.slice(0,2).map(trip =>
          <Carousel.Item key={`trip--${trip.id}`} className="carousel-item" >
            <img
              className="img-carousel"
              src={trip.cover_img}
              alt="Trip cover image"
            />
            <Link to={`/trip/${trip.id}`} className="img-carousel img-carousel-p">&mdash; {trip.destinations[0].city}, {trip.destinations[0].state}</Link>
          </Carousel.Item>)
      }
    </Carousel>
  );
}
