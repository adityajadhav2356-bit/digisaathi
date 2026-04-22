import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Activity, Users, Star, Award, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

const VolunteerOverview = ({ bookings }) => {
  const completed = bookings.filter(b => b.status === 'completed').length;
  const active = bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const avgRating = bookings.filter(b => b.rating).reduce((acc, curr) => acc + curr.rating.score, 0) / (bookings.filter(b => b.rating).length || 1);

  // Derive "Activity Feed" from recent messages, tasks, and bookings
  const activities = [];
  bookings.forEach(b => {
    activities.push({ type: 'booking', time: b.createdAt, msg: `New request from ${b.seniorName}`, urgent: b.isSOS });
    if (b.status === 'completed') activities.push({ type: 'complete', time: b.createdAt, msg: `Session finished with ${b.seniorName}`, urgent: false });
    b.messages?.forEach(m => activities.push({ type: 'chat', time: m.timestamp, msg: `Message from ${m.sender}: "${m.text.substring(0, 20)}..."`, urgent: false }));
    b.tasks?.forEach(t => t.completed && activities.push({ type: 'task', time: b.createdAt, msg: `${b.seniorName} completed a task!`, urgent: false }));
  });
  activities.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Helped', val: completed, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active Sessions', val: active, icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Pending Requests', val: pending, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Avg Rating', val: avgRating.toFixed(1), icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        ].map((s, i) => (
          <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: i*0.1}} className="wa-panel p-4 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${s.bg} ${s.color}`}><s.icon size={24}/></div>
            <div>
              <p className="text-2xl font-black text-slate-800">{s.val}</p>
              <p className="text-xs font-bold text-slate-500 uppercase">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gamification / Badges */}
        <div className="wa-panel p-6 flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <Award className="text-purple-500"/> My Achievements
          </h3>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex-1 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                <Star size={24} className="text-white fill-white"/>
              </div>
              <p className="font-bold text-sm text-slate-700">Top Helper🏆</p>
              <p className="text-[10px] text-slate-500">Awarded for 50+ sessions</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex-1 text-center opacity-50 grayscale">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Activity size={24} className="text-white"/>
              </div>
              <p className="font-bold text-sm text-slate-700">Speed Demon⚡</p>
              <p className="text-[10px] text-slate-500">Sub 2m response time</p>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-xs font-bold text-slate-500 mb-1 flex justify-between"><span>Weekly Goal</span> <span>{active+completed}/10</span></p>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-wa-teal rounded-full transition-all duration-1000" style={{width: `${Math.min(((active+completed)/10)*100, 100)}%`}}></div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="wa-panel p-6 overflow-hidden flex flex-col h-[300px]">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4">
            <TrendingUp className="text-wa-teal"/> Live Activity Feed
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400 text-center mt-10 italic">Waiting for activity...</p>
            ) : (
              activities.slice(0, 15).map((act, i) => (
                <div key={i} className="flex gap-3 items-start relative">
                  <div className="absolute top-5 bottom-[-20px] left-3 w-0.5 bg-slate-100 -z-10 shadow-sm"></div>
                  <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2 border-white 
                    ${act.urgent ? 'bg-red-500 animate-pulse' : act.type==='chat' ? 'bg-blue-400' : act.type === 'complete' ? 'bg-green-400' : 'bg-wa-teal'}`}>
                    {act.urgent ? <AlertTriangle size={12} className="text-white"/> : <Clock size={12} className="text-white"/>}
                  </div>
                  <div>
                    <p className={`text-sm ${act.urgent ? 'text-red-600 font-bold' : 'text-slate-700 font-medium'}`}>{act.msg}</p>
                    <p className="text-[10px] text-slate-400">{new Date(act.time).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VolunteerOverview;
