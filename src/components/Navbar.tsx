/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Camera, 
  Bot, 
  UserCircle, 
  Download, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types/schema.ts';

export type NavTab = 'workout' | 'progress' | 'visual_diff' | 'pose_counter' | 'ai_coach';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  userProfile: UserProfile;
  onOpenOnboarding: () => void;
  onExportJSON: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  userProfile,
  onOpenOnboarding,
  onExportJSON
}) => {
  const goalLabels: Record<string, string> = {
    build_muscle: 'Մկանաշինություն (Hypertrophy)',
    lose_fat: 'Ճարպի այրում (Fat Loss)',
    strength: 'Ուժ և Հզորություն (Strength)',
    general_fitness: 'Ընդհանուր ֆիթնես',
    endurance: 'Դիմացկունություն'
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Dumbbell className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  AI Fitness Coach
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  MVP
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Խելացի մարզումներ • MediaPipe • YouTube Demo
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onTabChange('workout')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'workout'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Այսօրվա պարապմունք</span>
            </button>

            <button
              onClick={() => onTabChange('progress')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Առաջընթաց</span>
            </button>

            <button
              onClick={() => onTabChange('visual_diff')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'visual_diff'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Վիզուալ համեմատություն</span>
            </button>

            <button
              onClick={() => onTabChange('pose_counter')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'pose_counter'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Pose Rep Counter</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                Փուլ 2
              </span>
            </button>

            <button
              onClick={() => onTabChange('ai_coach')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'ai_coach'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Մարզիչ</span>
            </button>
          </nav>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenOnboarding}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-sm"
              title="Փոխել պրոֆիլը կամ նպատակը"
            >
              <UserCircle className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline font-medium text-slate-200">
                {userProfile.name}
              </span>
              <span className="text-xs text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded hidden lg:inline">
                {goalLabels[userProfile.goal] || userProfile.goal}
              </span>
            </button>

            <button
              onClick={onExportJSON}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Արտահանել տվյալները (JSON Export / GitHub Ready)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => onTabChange('workout')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'workout' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Պարապմունք</span>
          </button>
          <button
            onClick={() => onTabChange('progress')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'progress' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <TrendingUp className="w-4 h-4 mb-0.5" />
            <span>Գրաֆիկ</span>
          </button>
          <button
            onClick={() => onTabChange('visual_diff')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'visual_diff' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Camera className="w-4 h-4 mb-0.5" />
            <span>Վիզուալ</span>
          </button>
          <button
            onClick={() => onTabChange('pose_counter')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'pose_counter' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Activity className="w-4 h-4 mb-0.5" />
            <span>Pose (Փ2)</span>
          </button>
          <button
            onClick={() => onTabChange('ai_coach')}
            className={`flex flex-col items-center py-1 px-2 rounded ${
              activeTab === 'ai_coach' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4 mb-0.5" />
            <span>AI Մարզիչ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
