/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * "Today's Workout" screen — shows the current split day, each exercise's
 * YouTube demo video, form cues, and a simple set/rep/weight logger.
 */

import React, { useState } from 'react';
import { CheckCircle2, PlayCircle, Info, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXERCISE_LIBRARY } from '../data/exerciseLibrary.ts';
import { getCurrentDayOfWeek } from '../services/splitGenerator.ts';
import { LocalDatabaseService } from '../services/db.ts';
import {
  WorkoutSplit,
  UserProfile,
  ExerciseSetLog,
  ExerciseSessionLog,
  WorkoutSession,
} from '../types/schema.ts';

interface TodayWorkoutProps {
  split: WorkoutSplit;
  userProfile: UserProfile;
  onSessionSaved: () => void;
}

export const TodayWorkout: React.FC<TodayWorkoutProps> = ({ split, userProfile, onSessionSaved }) => {
  const today = getCurrentDayOfWeek();
  const day = split.days[today];

  const [log, setLog] = useState<Record<string, ExerciseSetLog[]>>({});
  const [saved, setSaved] = useState(false);

  if (!day || day.is_rest_day) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-white mb-2">Այսօր հանգստի օր է 🌿</h2>
          <p className="text-slate-400">
            Մկանները աճում են հանգստի ժամանակ։ Օգտագործիր օրը վերականգնման, ջրի ընդունման և քնի համար։
          </p>
        </div>
      </div>
    );
  }

  const exercises = day.exercise_ids
    .map(id => EXERCISE_LIBRARY.find(e => e.id === id))
    .filter(Boolean);

  const getSets = (exerciseId: string, defaultSets: number): ExerciseSetLog[] => {
    if (log[exerciseId]) return log[exerciseId];
    return Array.from({ length: defaultSets }, (_, i) => ({
      set_number: i + 1,
      weight: 0,
      reps: 0,
      rpe: 7,
      completed: false,
    }));
  };

  const updateSet = (exerciseId: string, defaultSets: number, setIndex: number, field: keyof ExerciseSetLog, value: number | boolean) => {
    const current = getSets(exerciseId, defaultSets);
    const updated = current.map((s, i) => (i === setIndex ? { ...s, [field]: value } : s));
    setLog(prev => ({ ...prev, [exerciseId]: updated }));
  };

  const handleFinishWorkout = () => {
    const exerciseLogs: ExerciseSessionLog[] = exercises.map(ex => ({
      exercise_id: ex!.id,
      sets: getSets(ex!.id, ex!.default_sets),
    }));

    const session: WorkoutSession = {
      id: `session_${Date.now()}`,
      user_id: userProfile.id,
      date: new Date().toISOString().slice(0, 10),
      split_day: today,
      title: day.title,
      duration_minutes: 45,
      exercises: exerciseLogs,
      completed: true,
      created_at: new Date().toISOString(),
    };

    LocalDatabaseService.saveWorkoutSession(session);
    setSaved(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    onSessionSaved();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <p className="text-indigo-400 text-sm font-semibold">{day.day_name_hy}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{day.title}</h1>
        <p className="text-slate-400 text-sm mt-1">{exercises.length} վարժություն • Նպատակ՝ {userProfile.goal}</p>
      </div>

      {saved && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center space-x-3 text-emerald-300">
          <PartyPopper className="w-5 h-5" />
          <span>Պարապմունքը պահպանվեց։ Լավ աշխատանք՝ {userProfile.name}։</span>
        </div>
      )}

      <div className="space-y-6">
        {exercises.map(ex => {
          if (!ex) return null;
          const sets = getSets(ex.id, ex.default_sets);
          return (
            <div key={ex.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Video demo */}
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={ex.video_url}
                    title={ex.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Info + logging */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{ex.name_hy}</h3>
                  <p className="text-xs text-slate-400 mb-3">{ex.equipment} • Առաջարկվող՝ {ex.default_sets} x {ex.default_reps}</p>

                  <div className="flex items-start space-x-2 mb-4 text-xs text-slate-300 bg-slate-900/50 rounded-lg p-3">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <ul className="space-y-1">
                      {(ex.instructions_hy || ex.instructions).map((ins, i) => (
                        <li key={i}>• {ins}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    {sets.map((s, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm">
                        <span className="w-6 text-slate-500">#{s.set_number}</span>
                        <input
                          type="number"
                          placeholder="կգ"
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                          value={s.weight || ''}
                          onChange={e => updateSet(ex.id, ex.default_sets, i, 'weight', Number(e.target.value))}
                        />
                        <span className="text-slate-500">x</span>
                        <input
                          type="number"
                          placeholder="կրկն."
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white"
                          value={s.reps || ''}
                          onChange={e => updateSet(ex.id, ex.default_sets, i, 'reps', Number(e.target.value))}
                        />
                        <button
                          onClick={() => updateSet(ex.id, ex.default_sets, i, 'completed', !s.completed)}
                          className={`ml-auto p-1.5 rounded-lg ${s.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleFinishWorkout}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
      >
        <PlayCircle className="w-5 h-5" />
        <span>Ավարտել պարապմունքը</span>
      </button>
    </div>
  );
};
