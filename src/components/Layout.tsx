'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, BookOpen, Trophy, User, Settings, Menu, X,
  Flame, Zap, ChevronRight
} from 'lucide-react';
import { useStore, calculateLevel, xpToNextLevel, getProgressStats } from '@/lib/store';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname();
  const store = useStore();
  const { userName, totalXp, streak } = store;
  
  const level = calculateLevel(totalXp);
  const { current, needed } = xpToNextLevel(totalXp);
  const progressPercent = (current / needed) * 100;
  const stats = getProgressStats(store);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Curriculum', href: '/curriculum', icon: BookOpen },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-void-950 text-slate-200 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-void-900 border-r border-void-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-void-700">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-void-950" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                MasteryPath
              </h1>
              <p className="text-xs text-void-500 font-mono">v1.0.0</p>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-void-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Stats */}
        <div className="p-4 border-b border-void-700">
          <div className="bg-void-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-void-400">Level {level}</span>
              <span className="text-sm font-mono text-cyan-400">{totalXp.toLocaleString()} XP</span>
            </div>
            <div className="h-2 bg-void-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-void-500">
              <span>{current} / {needed} XP</span>
              <span>Level {level + 1}</span>
            </div>
          </div>
          
          {/* Streak */}
          <div className="mt-3 flex items-center gap-3 px-2">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="font-semibold">{streak}</span>
            </div>
            <span className="text-xs text-void-500">day streak</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                    : 'text-void-400 hover:bg-void-700 hover:text-white'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Progress Summary */}
        <div className="p-4 border-t border-void-700">
          <div className="text-center">
            <p className="text-xs text-void-500 mb-1">Overall Progress</p>
            <p className="text-2xl font-bold text-white">
              {stats.percentage}%
            </p>
            <p className="text-xs text-void-500">{stats.completed} / {stats.total} lessons</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-void-900/80 backdrop-blur-sm border-b border-void-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-void-700 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 lg:flex-none" />
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-void-800 rounded-lg border border-void-700">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold">{streak}</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-void-800 rounded-lg border border-void-700">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold">{totalXp.toLocaleString()}</span>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
