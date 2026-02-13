
import React, { useState, useEffect } from 'react';
import { Youtube, Music, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2000&auto=format&fit=crop",
      buttonText: "NUEVAS GALLETAS CON CHISPAS"
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2000&auto=format&fit=crop",
      buttonText: "PROMOCIÓN VERANO: GELATINAS"
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=2000&auto=format&fit=crop",
      buttonText: "NUEVO FLAN VAINILLA 1.5L"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[420px] rounded-[3.5rem] overflow-hidden shadow-sm group border-4 border-white">
      {/* Background Images Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <img 
            src={slide.img} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]" 
            alt={`Slide ${slide.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Social Side Icons */}
      <div className="absolute right-10 bottom-20 flex flex-col gap-4 text-white/60 z-10">
         <Youtube size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
         <Music size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
         <Instagram size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
         <div className="h-10 w-[1px] bg-white/20 mx-auto mt-2"></div>
         <span className="[writing-mode:vertical-lr] text-[9px] font-black tracking-[0.4em] uppercase opacity-40">SÍGUENOS</span>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Action Button (Posicionado a la izquierda para mejor legibilidad sobre el gradiente) */}
      <div className="absolute bottom-12 left-16 z-10">
         <button className="bg-[#E21F26] text-white px-14 py-5 rounded-full font-black uppercase italic text-xs tracking-[0.2em] shadow-2xl shadow-red-500/40 hover:scale-105 transition-transform flex items-center gap-3">
           {slides[currentSlide].buttonText}
           <ArrowRight size={16} />
         </button>
      </div>

      {/* Pagination Line Indicators */}
      <div className="absolute bottom-14 right-24 flex gap-3 items-center z-10">
        {slides.map((_, index) => (
          <div 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer transition-all duration-500 rounded-full h-1.5 ${
              index === currentSlide ? 'w-16 bg-white shadow-lg' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default FeaturedBanner;
