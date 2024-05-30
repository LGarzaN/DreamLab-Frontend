import React from 'react'
import Slider from 'react-slick'

interface News {
    title: string;
    content: string;
    date: string;
    shown: boolean;
    deleted: boolean;
    image: string;
}

interface props {
    newsArray: News[];
}

const NewsCarrousel: React.FC<props> = ({newsArray}) => {
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
    console.log(newsArray)
  return (
    <Slider {...settings} className='w-full' dots={false}>
        {newsArray.map((news: News, index) => (
            <div key={index} className="px-10">
                <NewsCard news={news} />
            </div>
        ))}
    </Slider>
  )
}

const NewsCard = ({ news }: { news: News }) => {
    return (
        <div className="bg-white bg-opacity-10 border-gray-300  border-opacity-20 rounded pb-2">
            <img src={news.image || "/videowall/news1.png"} className="" alt="..." />
            <div className="">
                <h5 className="">{news.title}</h5>
                <p className="">{news.content}</p>
                <p className=""><small className="text-muted">{news.date}</small></p>
            </div>
        </div>
    );
}

export default NewsCarrousel
