import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle, Send, StickyNote, Star, User, ShieldAlert, Award } from 'lucide-react';
import { addMessage, assignTask, completeTask, saveVolunteerNotes, submitSeniorReview } from '../utils/bookingStore';

const SessionWorkspace = ({ booking, userRole }) => {
  const [chatMsg, setChatMsg] = useState('');
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState(booking.volunteerNotes || '');
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    addMessage(booking.id, userRole, chatMsg.trim());
    setChatMsg('');
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    assignTask(booking.id, newTask.trim());
    setNewTask('');
  };

  const isSenior = userRole === 'senior';
  const isVolunteer = userRole === 'volunteer';

  return (
    <div className="w-full flex md:flex-row flex-col gap-4 mt-4 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner">
      
      {/* LEFT: Live Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[400px]">
        <div className="bg-wa-teal text-white p-3 font-bold flex items-center justify-between">
          <span className="flex items-center gap-2"><MessageCircle size={18}/> Support Chat</span>
          {booking.isSOS && <span className="bg-red-500 px-2 py-0.5 rounded text-xs animate-pulse">EMERGENCY SOS</span>}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {!booking.messages || booking.messages.length === 0 ? (
            <div className="text-center text-slate-400 mt-10 text-sm">No messages yet. Send a message to start!</div>
          ) : (
            booking.messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === userRole ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 max-w-[80%] rounded-2xl ${m.sender === userRole ? 'bg-wa-light text-wa-dark rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'} shadow-sm`}>
                  <p className="text-sm font-semibold">{m.text}</p>
                  <p className="text-[10px] opacity-60 mt-1 text-right">{new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input 
            type="text" value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-wa-teal transition text-sm font-medium"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-wa-teal text-white p-2 rounded-xl hover:bg-wa-dark transition shadow"><Send size={18}/></button>
        </form>
      </div>

      {/* RIGHT: Tasks & Notes */}
      <div className="w-full md:w-72 flex flex-col gap-4">
        
        {/* Practice Tasks */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3"><CheckCircle size={16} className="text-blue-500"/> Learning Tasks</h4>
          
          <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
            {(!booking.tasks || booking.tasks.length === 0) && <p className="text-xs text-slate-400 italic">No tasks assigned yet.</p>}
            {booking.tasks?.map(t => (
              <div key={t.id} className="flex items-center gap-2 text-xs font-medium">
                <input 
                  type="checkbox" checked={t.completed} onChange={() => isSenior && !t.completed && completeTask(booking.id, t.id)}
                  className={`rounded border-slate-300 w-4 h-4 ${isSenior && !t.completed ? 'cursor-pointer accent-wa-green' : 'opacity-60 cursor-not-allowed'}`}
                />
                <span className={`${t.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{t.text}</span>
              </div>
            ))}
          </div>

          {isVolunteer && (
            <form onSubmit={handleAssignTask} className="flex gap-1">
              <input type="text" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Assign task..." className="flex-1 text-xs px-2 py-1.5 bg-slate-100 rounded outline-none border border-transparent focus:border-blue-300"/>
              <button type="submit" className="bg-blue-600 text-white px-2 py-1.5 rounded text-xs font-bold">+</button>
            </form>
          )}
        </div>

        {/* Notes / Ratings based on Role */}
        {isVolunteer && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-2"><StickyNote size={16} className="text-amber-500"/> Internal Notes</h4>
            <textarea 
              value={notes} onChange={e=>setNotes(e.target.value)} onBlur={() => saveVolunteerNotes(booking.id, notes)}
              className="flex-1 w-full bg-amber-50/50 border border-amber-100 rounded-xl p-2 text-xs font-medium text-slate-700 outline-none focus:ring-2 ring-amber-300 resize-none min-h-[80px]"
              placeholder="Private notes on senior's progress..."
            />
          </div>
        )}

        {isSenior && booking.status === 'completed' && !booking.rating && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex-1 flex flex-col justify-center text-center">
            <h4 className="font-bold text-slate-800 text-sm mb-2">Rate Session</h4>
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={()=>setReviewScore(s)}>
                  <Star size={24} className={s <= reviewScore ? "text-amber-400 fill-amber-400 drop-shadow-sm" : "text-slate-200"}/>
                </button>
              ))}
            </div>
            <button onClick={() => submitSeniorReview(booking.id, reviewScore, 'Great help!')} className="btn-wa-primary py-1.5 text-xs rounded-lg shadow-none w-full">Submit Review</button>
          </div>
        )}

        {booking.rating && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 bg-gradient-to-br from-amber-50 to-white">
            <h4 className="font-bold text-amber-800 text-sm flex items-center gap-2 mb-1"><Award size={16}/> Rating Given</h4>
            <div className="flex gap-0.5"><Star size={14} className="text-amber-400 fill-amber-400"/> {booking.rating.score}/5</div>
          </div>
        )}

      </div>
    </div>
  );
};
export default SessionWorkspace;
