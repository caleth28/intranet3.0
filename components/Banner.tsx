
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Youtube, Music, Instagram } from 'lucide-react';

const Banner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=2000&auto=format&fit=crop",
      title: "FLAN VAINILLA",
      sub: "Lanzamiento Formato 1.5L",
      tag: "TOP VENTAS"
    },
    {
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2000&auto=format&fit=crop",
      title: "GELATINA FRESA",
      sub: "Campaña Verano 2026",
      tag: "NUEVO STOCK"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl group border-4 border-white">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.img} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[10s] ease-linear" alt={slide.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent"></div>
        </div>
      ))}
      
      {/* Content Overlay */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 space-y-4">
         <span className="bg-red-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic shadow-lg">
           {slides[activeSlide].tag}
         </span>
         <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
           {slides[activeSlide].title}
         </h2>
         <p className="text-sm font-bold text-white/80 uppercase tracking-widest italic">
           {slides[activeSlide].sub}
         </p>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-10 left-16 right-16 flex justify-between items-end">
        <div className="flex gap-3">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeSlide ? 'w-12 bg-red-600' : 'w-4 bg-white/30'}`}
            ></div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/20 shadow-xl">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/20 shadow-xl">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
