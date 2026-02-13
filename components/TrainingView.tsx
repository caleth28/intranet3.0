
import React, { useState } from 'react';
import { 
  PlayCircle, 
  Award, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  Lock,
  FileText,
  Video,
  X,
  QrCode,
  ShieldCheck,
  Download as DownloadIcon,
  Printer
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'lecture' | 'quiz';
  duration: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  progress: number;
  image: string;
  tag: string;
  description: string;
  lessons: Lesson[];
}

const TrainingView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const courses: Course[] = [
    { 
      id: 'c1',
      title: 'TÉCNICAS DE MERCHANDISING UNIVERSAL', 
      category: 'PERFECT STORE', 
      duration: '45 MIN', 
      progress: 100, 
      tag: 'PERFECT STORE',
      description: 'Aprende a dominar el punto de venta con las mejores prácticas de exhibición para nuestros productos estrella.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
      lessons: [
        { id: 'l1', title: 'Introducción al Perfect Store', type: 'video', duration: '5:00', completed: true },
        { id: 'l2', title: 'Planogramas de Postres', type: 'lecture', duration: '10:00', completed: true },
        { id: 'l3', title: 'Exhibición Crítica en Góndola', type: 'video', duration: '15:00', completed: true },
        { id: 'l4', title: 'Examen Final de Certificación', type: 'quiz', duration: '15:00', completed: true },
      ]
    },
    { 
      id: 'c2',
      title: 'LANZAMIENTO: NUEVA LÍNEA INDUSTRIAL Q4', 
      category: 'PRODUCTOS', 
      duration: '30 MIN', 
      progress: 45, 
      tag: 'PRODUCTOS',
      description: 'Descubre los nuevos formatos de 5kg y 10kg diseñados exclusivamente para el canal Horeca y panaderías.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
      lessons: [
        { id: 'l5', title: 'Portafolio Industrial 2025', type: 'video', duration: '8:00', completed: true },
        { id: 'l6', title: 'Argumentos de Venta B2B', type: 'lecture', duration: '12:00', completed: false },
        { id: 'l7', title: 'Comparativa de Rendimiento', type: 'video', duration: '10:00', completed: false },
      ]
    },
    { 
      id: 'c3',
      title: 'MANEJO DE OBJECIONES EN BODEGAS', 
      category: 'VENTAS', 
      duration: '20 MIN', 
      progress: 0, 
      tag: 'VENTAS',
      description: 'Estrategias de comunicación efectiva para rebatir las dudas más comunes de los bodegueros sobre rotación de stock.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
      lessons: [
        { id: 'l8', title: 'Psicología del Cliente Tradicional', type: 'video', duration: '6:00', completed: false },
        { id: 'l9', title: 'Las 5 Objeciones Típicas', type: 'lecture', duration: '8:00', completed: false },
        { id: 'l10', title: 'Simulación de Venta Real', type: 'video', duration: '6:00', completed: false },
      ]
    },
  ];

  const CertificateModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setShowCertificate(false)}></div>
      
      <div className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-white animate-in zoom-in-95 duration-500">
        
        {/* Header del Modal */}
        <div className="absolute top-8 right-8 z-10">
          <button 
            onClick={() => setShowCertificate(false)}
            className="p-3 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENIDO DEL CERTIFICADO */}
        <div className="p-16 relative bg-[#FCFCFC]">
          {/* Bordes Decorativos Rojos */}
          <div className="absolute inset-4 border-[1px] border-red-100 rounded-[2.5rem] pointer-events-none"></div>
          <div className="absolute inset-8 border-[2px] border-red-600 rounded-[2rem] pointer-events-none"></div>

          {/* Logo y Encabezado */}
          <div className="text-center mb-12">
            <img 
              src="https://www.universal.com.pe/wp-content/uploads/2021/08/logo-universal.png" 
              className="h-20 mx-auto mb-6 drop-shadow-sm" 
              alt="Logo Universal" 
            />
            <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] italic">Certificado de Excelencia</h1>
          </div>

          <div className="text-center space-y-8 max-w-3xl mx-auto">
             <p className="text-lg font-bold text-slate-800 uppercase italic tracking-widest">Se otorga el presente reconocimiento a:</p>
             
             <div className="relative inline-block px-12 py-4">
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900"></div>
                <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Caleth Lavado Verona</h2>
             </div>

             <p className="text-base font-medium text-slate-500 leading-relaxed italic">
               Por haber completado satisfactoriamente el programa de entrenamiento especializado en la <b>Escuela Universal</b>, demostrando un dominio técnico superior en el curso de:
             </p>

             <h3 className="text-3xl font-black text-red-600 uppercase italic leading-tight tracking-tight">
               {selectedCourse?.title || "TÉCNICAS DE MERCHANDISING UNIVERSAL"}
             </h3>

             <div className="pt-12 grid grid-cols-3 gap-10 items-end">
                {/* Firma 1 */}
                <div className="text-center">
                   <div className="h-16 flex items-center justify-center mb-2">
                      <p className="font-serif italic text-2xl text-slate-400 opacity-50">Firmado Digitalmente</p>
                   </div>
                   <div className="h-[1px] bg-slate-200 mb-2"></div>
                   <p className="text-[10px] font-black uppercase text-slate-900">Gerencia de Distribución</p>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Universal SAC</p>
                </div>

                {/* Sello de Maestría Central */}
                <div className="flex flex-col items-center justify-center">
                   <div className="w-32 h-32 rounded-full border-4 border-yellow-500/30 flex items-center justify-center p-2 relative bg-white shadow-inner">
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                         <ShieldCheck size={32} />
                         <span className="text-[8px] font-black uppercase tracking-tighter mt-1">Maestro 2025</span>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg">
                         <CheckCircle2 size={16} />
                      </div>
                   </div>
                </div>

                {/* QR de Verificación */}
                <div className="flex flex-col items-center">
                   <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-2 group-hover:scale-105 transition-transform">
                      <QrCode size={48} className="text-slate-900" />
                   </div>
                   <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Verificar Autenticidad</p>
                   <p className="text-[8px] font-bold text-slate-300">ID: CERT-2025-CLV</p>
                </div>
             </div>
          </div>
        </div>

        {/* Footer de Acciones del Modal */}
        <div className="bg-slate-900 p-8 flex justify-center gap-4">
           <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center shadow-2xl">
              <DownloadIcon size={18} className="mr-3" /> Descargar PDF
           </button>
           <button className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center border border-white/10">
              <Printer size={18} className="mr-3" /> Imprimir Original
           </button>
        </div>
      </div>
    </div>
  );

  if (selectedCourse) {
    const currentLesson = selectedCourse.lessons[currentLessonIndex];

    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        {showCertificate && <CertificateModal />}

        {/* Barra de Navegación del Curso */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="flex items-center text-gray-400 hover:text-red-600 transition-colors font-black text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={18} className="mr-2" /> VOLVER A LA ESCUELA
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">CURSO ACTUAL:</span>
            <span className="text-sm font-black text-gray-900 uppercase italic">{selectedCourse.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Visualizador de Contenido */}
          <div className="lg:col-span-8 space-y-8">
            <div className="aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative group border-4 border-white">
              {currentLesson.type === 'video' ? (
                <>
                  <img src={selectedCourse.image} className="w-full h-full object-cover opacity-40 blur-sm" alt="Video Placeholder" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <PlayCircle className="text-white w-24 h-24 drop-shadow-2xl animate-pulse cursor-pointer hover:scale-110 transition-transform" />
                    <p className="text-white font-black uppercase tracking-[0.3em] mt-6 text-xs italic">Reproduciendo Lección {currentLessonIndex + 1}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-white p-16 overflow-y-auto no-scrollbar">
                   <h2 className="text-3xl font-black text-gray-900 uppercase italic mb-8">{currentLesson.title}</h2>
                   <div className="space-y-6 text-gray-600 font-medium leading-relaxed">
                      <p>Para maximizar la visibilidad de nuestros productos, es vital que los planogramas se respeten al 100%. La regla de oro en Universal es que el Flan Sabor Vainilla siempre debe ocupar el nivel de los ojos del consumidor.</p>
                      <p>Recuerda que los empaques familiares de 500g deben ir en la base de la estantería, mientras que los sobres individuales de 160g deben agruparse por colores para crear un "bloque cromático" que atraiga la vista.</p>
                      <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex items-start gap-6">
                         <Award className="text-red-600 shrink-0" size={32} />
                         <div>
                            <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">Tip de Maestro:</p>
                            <p className="text-sm font-bold text-red-900 italic">Siempre coloca los productos de mayor rotación a la derecha de la góndola, siguiendo el flujo de tránsito natural de la tienda.</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-black text-gray-900 uppercase italic leading-none">{currentLesson.title}</h3>
                 <span className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic flex items-center">
                   <Clock size={14} className="mr-2" /> {currentLesson.duration}
                 </span>
               </div>
               <p className="text-gray-500 font-medium leading-relaxed mb-10">
                 En esta lección cubriremos los fundamentos de la categoría. Es esencial entender cómo cada SKU aporta al crecimiento del ticket promedio. Revisa bien el material antes de pasar al siguiente módulo.
               </p>
               <div className="flex gap-4">
                  <button className="flex-1 bg-red-600 text-white py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl active:scale-95">
                    MARCAR COMO COMPLETADO
                  </button>
                  <button 
                    onClick={() => setCurrentLessonIndex(prev => Math.min(selectedCourse.lessons.length - 1, prev + 1))}
                    className="flex-1 bg-slate-900 text-white py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    SIGUIENTE LECCIÓN <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>

          {/* Temario Sidebar */}
          <div className="lg:col-span-4">
             <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden sticky top-28">
                <div className="p-8 bg-gray-50 border-b border-gray-100">
                   <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic mb-2">Temario del Curso</h4>
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-gray-900 italic">{selectedCourse.progress}% COMPLETADO</span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${selectedCourse.progress}%` }}></div>
                      </div>
                   </div>
                </div>
                <div className="p-4 space-y-2">
                   {selectedCourse.lessons.map((lesson, idx) => (
                     <button 
                       key={lesson.id}
                       onClick={() => setCurrentLessonIndex(idx)}
                       className={`
                        w-full flex items-center gap-4 p-5 rounded-[1.8rem] transition-all group
                        ${idx === currentLessonIndex ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}
                       `}
                     >
                        <div className={`
                          w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                          ${lesson.completed ? 'bg-emerald-50 text-emerald-600' : (idx === currentLessonIndex ? 'bg-red-600 text-white shadow-red-200' : 'bg-white border border-gray-100 text-gray-300')}
                        `}>
                           {lesson.completed ? <CheckCircle2 size={18} strokeWidth={3} /> : (lesson.type === 'video' ? <Video size={18} /> : <FileText size={18} />)}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                           <p className={`text-[10px] font-black uppercase tracking-tight truncate ${idx === currentLessonIndex ? 'text-red-600' : 'text-gray-900'}`}>
                             {lesson.title}
                           </p>
                           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</p>
                        </div>
                        {idx > currentLessonIndex && !lesson.completed && <Lock size={12} className="text-gray-300" />}
                     </button>
                   ))}
                </div>
                <div className="p-8 border-t border-gray-50">
                   <button 
                     onClick={() => setShowCertificate(true)}
                     disabled={selectedCourse.progress < 100}
                     className={`
                       w-full flex items-center gap-4 p-5 rounded-[1.8rem] border transition-all
                       ${selectedCourse.progress === 100 
                         ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' 
                         : 'bg-gray-50 border-gray-100 text-gray-300 opacity-50 cursor-not-allowed'}
                     `}
                   >
                      <Award size={24} />
                      <div className="text-left">
                         <p className="text-[10px] font-black uppercase tracking-widest italic leading-none mb-1">Certificación</p>
                         <p className="text-[9px] font-bold uppercase tracking-tighter">Descargar Diploma Oficial</p>
                      </div>
                      <DownloadIcon size={16} className="ml-auto" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Estilo Referencia */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black text-gray-900 uppercase italic leading-none mb-2">Escuela Universal</h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.15em] text-xs">Capacita a tu fuerza de ventas para ganar el mercado</p>
        </div>
        
        {/* Stats Estilo Referencia */}
        <div className="flex bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden divide-x divide-gray-100">
           <div className="p-4 px-8 text-center min-w-[140px]">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Cursos Completados</p>
              <p className="text-3xl font-black text-red-600 italic">12</p>
           </div>
           <div className="p-4 px-8 text-center min-w-[140px]">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1.5">Puntos Acumulados</p>
              <p className="text-3xl font-black text-blue-600 italic">850</p>
           </div>
        </div>
      </div>

      {/* Grid de Cursos Estilo Referencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-[2.8rem] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
          >
             {/* Imagen con Tag Flotante */}
             <div className="relative h-56 overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
                <div className="absolute top-6 left-6">
                   <span className="bg-white/95 backdrop-blur-md px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-xl italic">
                      {course.tag}
                   </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                   <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={60} />
                </div>
             </div>

             {/* Contenido Card */}
             <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 italic">
                   <Clock size={16} className="mr-2 text-red-600" strokeWidth={3} /> {course.duration}
                </div>
                
                <h3 className="text-[1.2rem] font-black text-gray-900 leading-[1.2] uppercase italic mb-8 group-hover:text-red-600 transition-colors">
                  {course.title}
                </h3>
                
                <div className="mt-auto space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest italic text-gray-900">Progreso</span>
                      <span className="text-[11px] font-black italic text-gray-900">{course.progress}%</span>
                   </div>
                   <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div 
                        className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-[#10B981]' : 'bg-[#E21F26]'}`} 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Banner Inferior Estilo Referencia (Navy) */}
      <div className="bg-[#0F172A] rounded-[3.5rem] p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group">
         <div className="absolute right-0 top-0 p-12 opacity-5 scale-150 rotate-12 group-hover:scale-[1.6] transition-transform duration-700">
            <Award size={180} />
         </div>
         
         <div className="flex items-center mb-8 md:mb-0 relative z-10">
            <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mr-8 rotate-3 shadow-lg shadow-red-900/40">
               <Award size={42} strokeWidth={2.5} />
            </div>
            <div>
               <h3 className="text-3xl font-black uppercase italic tracking-tight mb-2">¡Certifica a tu equipo!</h3>
               <p className="text-gray-400 font-bold uppercase tracking-[0.15em] text-xs">Completa el programa de Distribución Maestro 2025</p>
            </div>
         </div>

         <button className="relative z-10 bg-white text-slate-900 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-red-600 hover:text-white transition-all flex items-center active:scale-95 group/btn">
            EMPEZAR PROGRAMA <ArrowRight size={20} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
         </button>
      </div>
    </div>
  );
};

export default TrainingView;

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
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
    className={className}
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
