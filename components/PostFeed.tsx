
import React, { useState } from 'react';
import { BadgeCheck, Heart, MessageSquare, Share2, MoreHorizontal, Send, CheckCircle2 } from 'lucide-react';

interface PostProps {
  admin: string;
  time: string;
  content: string;
  image?: string;
  official?: boolean;
}

const PostFeed: React.FC<PostProps> = ({ admin, time, content, image, official }) => {
  // Estados para la funcionalidad
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 20) + 1);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{id: number, text: string, user: string}[]>([]);
  const [showShareToast, setShowShareToast] = useState(false);

  // Manejador de Likes
  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  // Manejador de Compartir
  const handleShare = () => {
    setShowShareToast(true);
    // Simular copiado al portapapeles
    navigator.clipboard.writeText(content).catch(() => {});
    setTimeout(() => setShowShareToast(false), 3000);
  };

  // Manejador de Comentarios
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      user: 'Caleth Lavado'
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div className="u-card overflow-hidden relative animate-in fade-in duration-500">
      {/* Notificación de Compartir (Toast) */}
      {showShareToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-2 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
           <CheckCircle2 size={14} className="text-emerald-500" />
           <span className="text-[9px] font-black uppercase tracking-widest italic">Enlace copiado al portapapeles</span>
        </div>
      )}

      {/* Cabecera del Post */}
      <div className="p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-slate-50 p-2 border border-slate-100 rounded-full flex items-center justify-center">
              <img 
                src="https://www.universal.com.pe/wp-content/uploads/2021/08/logo-universal.png" 
                className="w-full object-contain" 
                alt="Universal"
              />
            </div>
            {official && (
               <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 border-4 border-white">
                 <BadgeCheck size={12} fill="white" className="text-blue-600" />
               </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1 tracking-tight">
              {admin}
            </h4>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{time}</p>
          </div>
        </div>
        <button className="text-slate-200 hover:text-slate-400 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Contenido del Post */}
      <div className="px-8 pb-8">
        <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
          {content}
        </p>
      </div>

      {/* Imagen del Post (Opcional) */}
      {image && (
        <div className="w-full h-80 overflow-hidden relative group">
           <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Acciones del Post */}
      <div className="p-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-8">
           {/* Botón ME GUSTA */}
           <button 
             onClick={handleLike}
             className={`flex items-center gap-2 transition-all active:scale-90 ${liked ? 'text-red-600' : 'text-slate-400 hover:text-red-600'}`}
           >
              <Heart 
                size={20} 
                fill={liked ? "currentColor" : "none"} 
                className={liked ? "animate-in zoom-in-75 duration-300" : ""} 
              />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest">Me gusta</span>
                {likesCount > 0 && <span className="text-[8px] font-bold opacity-60">{likesCount}</span>}
              </div>
           </button>

           {/* Botón COMENTAR */}
           <button 
             onClick={() => setShowComments(!showComments)}
             className={`flex items-center gap-2 transition-all ${showComments ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
           >
              <MessageSquare size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Comentar</span>
           </button>
        </div>

        {/* Botón COMPARTIR */}
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all active:scale-95"
        >
           <Share2 size={20} />
           <span className="text-[10px] font-black uppercase tracking-widest">Compartir</span>
        </button>
      </div>

      {/* Sección de Comentarios (Acordeón) */}
      {showComments && (
        <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-4 mb-6 max-h-40 overflow-y-auto no-scrollbar pt-2">
            {comments.map(c => (
              <div key={c.id} className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                <img src="https://picsum.photos/seed/user123/100/100" className="w-8 h-8 rounded-full object-cover shrink-0" alt="CL" />
                <div>
                   <p className="text-[9px] font-black text-slate-900 uppercase italic leading-none mb-1">{c.user}</p>
                   <p className="text-[11px] font-medium text-slate-500 italic">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handlePostComment} className="relative flex items-center gap-3 mt-4">
             <img src="https://picsum.photos/seed/user123/100/100" className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" alt="CL" />
             <input 
               type="text" 
               placeholder="Escribe un comentario corporativo..."
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               className="flex-1 bg-slate-50 border-none rounded-2xl py-3 px-5 text-[11px] font-medium outline-none focus:ring-2 focus:ring-red-100 transition-all italic"
             />
             <button 
               type="submit"
               disabled={!commentText.trim()}
               className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-red-600 transition-all disabled:opacity-30"
             >
               <Send size={16} />
             </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
