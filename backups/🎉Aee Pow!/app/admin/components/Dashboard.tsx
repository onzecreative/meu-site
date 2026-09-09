"use client";

import React, { useEffect, useState } from 'react';
import { 
  IconPhoto, 
  IconHistory, 
  IconCircleCheck, 
  IconCircleX,
  IconArrowRight,
  IconSmartHome,
  IconMessageChatbot,
  IconBrandWhatsapp
} from '@tabler/icons-react';

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    images: 0,
    lastEdit: '-',
    status: 'Online'
  });

  useEffect(() => {
    fetch('/api/admin/logs')
      .then(r => r.json())
      .then(data => {
        setLogs(data);
        if (data.length > 0) {
          setStats(prev => ({ ...prev, lastEdit: `${data[0].section} - ${new Date(data[0].timestamp).toLocaleTimeString()}` }));
        }
      });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Admin</h1>
        <p className="text-white/40">Here is what's happening with your site today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Images" 
          value="42" 
          icon={<IconPhoto className="text-blue-500" />} 
          subtitle="In your library"
        />
        <StatCard 
          title="Last Update" 
          value={stats.lastEdit} 
          icon={<IconHistory className="text-orange-500" />} 
          subtitle="Section modified"
        />
        <StatCard 
          title="Site Status" 
          value="Online" 
          icon={<IconCircleCheck className="text-green-500" />} 
          subtitle="System operational"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionBtn 
              label="Edit Hero" 
              icon={<IconSmartHome />} 
              onClick={() => setActiveTab('hero')} 
            />
            <QuickActionBtn 
              label="Manage Galery" 
              icon={<IconPhoto />} 
              onClick={() => setActiveTab('gallery')} 
            />
            <QuickActionBtn 
              label="Testimonials" 
              icon={<IconMessageChatbot />} 
              onClick={() => setActiveTab('testimonials')} 
            />
            <QuickActionBtn 
              label="WhatsApp" 
              icon={<IconBrandWhatsapp />} 
              onClick={() => setActiveTab('footer')} 
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {logs.length > 0 ? logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <IconHistory size={16} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white capitalize">{log.section}</p>
                    <p className="text-xs text-white/30">{log.action}</p>
                  </div>
                </div>
                <span className="text-[10px] text-white/20 font-medium">
                  {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <p className="text-sm text-white/20 text-center py-10">No recent activity found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1 truncate">{value}</h3>
      <p className="text-xs text-white/30">{subtitle}</p>
    </div>
  );
}

function QuickActionBtn({ label, icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all group"
    >
      <div className="text-white/40 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}
