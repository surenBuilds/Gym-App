/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Simple chat UI for the AI Coach — calls POST /api/coach/advice on the
 * Express/Gemini backend and renders the structured response.
 */

import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { UserProfile, WorkoutSession, AICoachAdviceResponse } from '../types/schema.ts';

interface AICoachChatProps {
  userProfile: UserProfile;
  recentSessions: WorkoutSession[];
}

export const AICoachChat: React.FC<AICoachChatProps> = ({ userProfile, recentSessions }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AICoachAdviceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/coach/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, userProfile, recentSessions }),
      });
      if (!res.ok) throw new Error('Սերվերի սխալ');
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError('Չհաջողվեց կապ հաստատել AI Մարզիչի հետ։ Ստուգիր, որ սերվերը աշխատում է։');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-white flex items-center space-x-2 mb-4">
        <Bot className="w-6 h-6 text-indigo-400" />
        <span>AI Մարզիչ</span>
      </h1>

      <div className="flex space-x-2 mb-6">
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ask()}
          placeholder="Օր.՝ Ինչպե՞ս բարձրացնել բենչ պրեսի քաշը..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 rounded-xl flex items-center justify-center"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {response && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
          <p className="text-white">{response.summary}</p>
          <div>
            <p className="text-xs font-semibold text-indigo-400 mb-1">Խորհուրդներ</p>
            <ul className="text-sm text-slate-300 space-y-1">
              {response.tips?.map((t, i) => <li key={i}>• {t}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-indigo-400 mb-1">Progressive Overload</p>
            <p className="text-sm text-slate-300">{response.progressive_overload_recommendation}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-indigo-400 mb-1">Ֆորմայի ուշադրություն</p>
            <p className="text-sm text-slate-300">{response.form_focus}</p>
          </div>
        </div>
      )}
    </div>
  );
};
