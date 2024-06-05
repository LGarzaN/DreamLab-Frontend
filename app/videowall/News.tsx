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
        slidesToShow: 1,
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
    <Slider {...settings} className='w-full flex' dots={false} arrows={false}>
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
        <div className="bg-white bg-opacity-10 border-gray-300  border-opacity-20 h-[70vh] flex flex-row rounded-lg">
            <img src={news.image || "/videowall/news1.png"} className="rounded-tr-none rounded-br-none w-[65%]" alt="..." />
            <div className="w-[35%] py-5 px-5">
                <p className="text-3xl text-center font-bold">{news.title}</p>
                <p className="mb-5 text-gray-300">{formatDate(news.date)}</p>
                <p className="text-xl">{news.content}</p>  
                
            </div>
        </div>
    );
}

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}


export default NewsCarrousel
