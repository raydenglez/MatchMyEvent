import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_BANNERS } from '../constants';
import type { BannerSlide } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

export const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides: BannerSlide[] = MOCK_BANNERS;

    const prevSlide = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length]);

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length]);
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-64 md:h-80 rounded-2xl mx-auto relative group">
            <div 
                style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            >
                <div className="w-full h-full rounded-2xl bg-black/40 flex flex-col justify-center items-start p-8 md:p-16">
                    <h2 className="text-white text-3xl md:text-4xl font-bold max-w-lg leading-tight">
                        {slides[currentIndex].title}
                    </h2>
                    <p className="text-white/90 mt-2 max-w-lg">
                        {slides[currentIndex].description}
                    </p>
                    <a 
                        href={slides[currentIndex].ctaLink}
                        className="mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                    >
                        {slides[currentIndex].ctaText}
                    </a>
                </div>
            </div>
            {/* Left Arrow */}
            <div onClick={prevSlide} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
                <ChevronLeftIcon className="h-6 w-6"/>
            </div>
            {/* Right Arrow */}
            <div onClick={nextSlide} className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
                <ChevronRightIcon className="h-6 w-6"/>
            </div>
            <div className="absolute bottom-5 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slide.id}
                            onClick={() => goToSlide(slideIndex)}
                            className={`transition-all w-2 h-2 bg-white rounded-full cursor-pointer ${currentIndex === slideIndex ? 'p-1.5' : 'bg-opacity-50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
