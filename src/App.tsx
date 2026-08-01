/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * AI Fitness Coach — Root Application
 * Wires together Navbar, Onboarding, Today's Workout, Progress Dashboard,
 * and the AI Coach chat panel.
 */

import { useEffect, useState } from 'react';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { TodayWorkout } from './components/TodayWorkout.tsx';
import { ProgressDashboard } from './components/ProgressDashboard.tsx';
import { AICoachChat } from './components/AICoachChat.tsx';
import { PhaseTwoPlaceholder } from './components/PhaseTwoPlaceholder.tsx';
import { LocalDatabaseService } from './services/db.ts';
import { UserProfile, WorkoutSplit, WorkoutSession } from './types/schema.ts';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => LocalDatabaseService.getUserProfile());
  const [split, setSplit] = useState<WorkoutSplit>(() => LocalDatabaseService.getWorkoutSplit());
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => LocalDatabaseService.getWorkoutSessions());
  const [activeTab, setActiveTab] = useState<NavTab>('workout');
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Open onboarding automatically the very first time (no profile customized yet)
  useEffect(() => {
    const hasProfile = !!localStorage.getItem('ai_fitness_user_profile');
    if (!hasProfile) setOnboardingOpen(true);
  }, []);

  const handleSaveProfile = (profile: UserProfile) => {
    LocalDatabaseService.saveUserProfile(profile);
    setUserProfile(profile);
    setSplit(LocalDatabaseService.getWorkoutSplit());
  };

  const handleSessionSaved = () => {
    setSessions(LocalDatabaseService.getWorkoutSessions());
  };

  const handleExportJSON = () => {
    const json = LocalDatabaseService.exportDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-fitness-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userProfile={userProfile}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        onExportJSON={handleExportJSON}
      />

      <main className="py-6">
        {activeTab === 'workout' && (
          <TodayWorkout split={split} userProfile={userProfile} onSessionSaved={handleSessionSaved} />
        )}
        {activeTab === 'progress' && <ProgressDashboard sessions={sessions} />}
        {activeTab === 'ai_coach' && (
          <AICoachChat userProfile={userProfile} recentSessions={sessions.slice(-5)} />
        )}
        {activeTab === 'visual_diff' && (
          <PhaseTwoPlaceholder
            title="Վիզուալ համեմատություն"
            description="Առաջընթացի լուսանկարների կողք-կողքի համեմատություն (առանց % գնահատականի) կավելացվի հաջորդ փուլում։"
          />
        )}
        {activeTab === 'pose_counter' && (
          <PhaseTwoPlaceholder
            title="Pose Rep Counter"
            description="MediaPipe Pose-ի միջոցով կրկնությունների ավտոմատ հաշվարկ և տեխնիկայի ստուգում իրական ժամանակում։"
          />
        )}
      </main>

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        currentUserProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
