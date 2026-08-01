/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Progress dashboard — shows progressive-overload chart (weight lifted over
 * time for a selected exercise) plus a session history list.
 */

import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { WorkoutSession } from '../types/schema.ts';
import { EXERCISE_LIBRARY } from '../data/exerciseLibrary.ts';

interface ProgressDashboardProps {
  sessions: WorkoutSession[];
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ sessions }) => {
  // Collect exercise ids that appear in the logged history
  const loggedExerciseIds = useMemo(() => {
    const ids = new Set<string>();
    sessions.forEach(s => s.exercises.forEach(e => ids.add(e.exercise_id)));
    return Array.from(ids);
  }, [sessions]);

  const [selectedExercise, setSelectedExercise] = useState(loggedExerciseIds[0] || '');

  const chartData = useMemo(() => {
    return sessions
      .filter(s => s.exercises.some(e => e.exercise_id === selectedExercise))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(s => {
        const ex = s.exercises.find(e => e.exercise_id === selectedExercise)!;
        const topSet = ex.sets.reduce((max, s2) => (s2.weight > max.weight ? s2 : max), ex.sets[0]);
        return { date: s.date, weight: topSet?.weight || 0 };
      });
  }, [sessions, selectedExercise]);

  const exerciseName = (id: string) => EXERCISE_LIBRARY.find(e => e.id === id)?.name_hy || id;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-indigo-400" />
          <span>Առաջընթաց</span>
        </h1>
        <p className="text-slate-400 text-sm">Progressive overload — քաշի աճը ժամանակի ընթացքում</p>
      </div>

      {loggedExerciseIds.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">
          Դեռ պարապմունքներ գրանցված չեն։ Ավարտիր առաջին պարապմունքը՝ գրաֆիկը տեսնելու համար։
        </div>
      ) : (
        <>
          <select
            value={selectedExercise}
            onChange={e => setSelectedExercise(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            {loggedExerciseIds.map(id => (
              <option key={id} value={id}>{exerciseName(id)}</option>
            ))}
          </select>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="կգ" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Պարապմունքների պատմություն</h2>
        <div className="space-y-2">
          {sessions
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(s => (
              <div key={s.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{s.title}</p>
                  <p className="text-xs text-slate-400">{s.date} • {s.duration_minutes} րոպե</p>
                </div>
                <span className="text-xs text-slate-400">{s.exercises.length} վարժ.</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
