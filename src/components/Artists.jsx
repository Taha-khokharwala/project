'use client'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { getArtistsApi } from '@/redux/actions/Campaign';

// const artists = [
//     { id: 1, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 2, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 3, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 4, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 5, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 6, title: 'Aditya', img: '/r_music1.jpg' },
//     { id: 7, title: 'Aditya', img: '/r_music1.jpg' },
// ]

const Artists = () => {

    const artistRef = useRef();
    const [artists, setArtists] = useState([])
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {

        getArtistsApi({

            limit: 10,
            order: "asc",

            onSuccess: (res) => {
                setArtists(res.data)
            },
            onError: (e) => {
                console.log(e)
            }
        })


    }, [])


    const handlePrev = () => {
        if (artistRef.current && !isBeginning) {
            artistRef.current.swiper.slidePrev();
        }
      
    };

    const handleNext = () => {
        if (artistRef.current && !isEnd) {
            artistRef.current.swiper.slideNext();
        }
        
    };

    return (
        <div className="div_container d-flex flex-column">

            <CategoryHeader
                title="Artists"
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                link="/artists"
            />
            

            <Swiper
                ref={artistRef}
                slidesPerView={5}
                loop={false}
                spaceBetween={30}
                freeMode={true}
                modules={[Pagination]}
                pagination={{
                    clickable: true
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onReachBeginning={() => {
                    setIsBeginning(true);
                }}
                onReachEnd={() => {
                    setIsEnd(true);
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
                className='mySwiper w-100'
            >
                {
                    artists.map((item, index) => (
                        <SwiperSlide key={item.id} virtualIndex={index}>
                            <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                <Image src={item.image} className="kirtan_img" alt={item.eng_name} width={252} height={252} />
                                <h5>
                                    <Link href='/kirtan'>{item.eng_name}</Link>
                                </h5>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default Artists