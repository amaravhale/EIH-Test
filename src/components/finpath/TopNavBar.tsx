import React from 'react';
import { Bell, Settings, Sun, Moon, Search, SlidersHorizontal, Calendar, ChevronDown } from 'lucide-react';

export function TopNavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#0A0A0A]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-[#D4FF00]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          <span className="text-xl font-bold text-white tracking-wide">Finpath</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-[#1A1A1A] p-1 rounded-full">
          <NavLink active>Dashboard</NavLink>
          <NavLink>Payments</NavLink>
          <NavLink>Analytics</NavLink>
          <NavLink>Cards</NavLink>
          <NavLink>AI Finpath</NavLink>
          <NavLink>Services</NavLink>
          <NavLink>Help</NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#1A1A1A] rounded-full p-1">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full text-zinc-400 hover:text-white transition-colors">
            <Sun className="w-4 h-4" /> Light
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-zinc-800 text-white">
            <Moon className="w-4 h-4" /> Dark
          </button>
        </div>

        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden ml-2 border border-white/10">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button className={`px-4 py-1.5 text-sm rounded-full transition-colors ${active ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}>
      {children}
    </button>
  );
}
