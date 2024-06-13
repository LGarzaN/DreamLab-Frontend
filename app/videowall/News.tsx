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
        autoplaySpeed: 5000,
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
        <div className="bg-white bg-opacity-10 border-gray-300  border-opacity-20 h-[60%] flex flex-row rounded-lg">
            <img src={news.image || "/videowall/news1.png"} className="w-[700px] h-[350px] rounded-tl-lg rounded-bl-lg" alt="..." />
            <div className="w-[500px] flex flex-col px-10 py-5 text-center">
                <p className="text-3xl font-bold mb-8">{news.title}</p>
                <p className="text-xl text-left">{news.content}</p>  
            </div>
        </div>
    );
}

const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}


export default NewsCarrousel
