import React from 'react';
import Slider from 'react-slick';
import ReservationCard from './ReservationCard';

interface Reservation {
    Matricula: string;
    Day: string;
    StartHour: string;
    EndHour: string;
    SpaceName: string;
    SpaceId: number;
    RequirementsId: string;
    RequirementsQuantity: string;
    GroupCode: string;
    Name: string;
    UserId: string;
    Fecha: [string];
}

interface CarouselProps {
    reservations: Reservation[];
}

const ReservationCarousel: React.FC<CarouselProps> = ({ reservations }) => {
    console.log("reservations", reservations);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings} arrows={false} dots={false}>
            {reservations.map((reservation, index) => (
                <div key={index} className="px-2"> 
                    <ReservationCard reservation={reservation} />
                </div>
            ))}
        </Slider>
    );
};

export default ReservationCarousel;
