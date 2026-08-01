/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Target, Dumbbell, Award, Scale, Calendar, Check, AlertCircle } from 'lucide-react';
import { UserProfile, GoalType, ExperienceLevel, EquipmentType } from '../types/schema.ts';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentUserProfile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentUserProfile.name);
  const [goal, setGoal] = useState<GoalType>(currentUserProfile.goal);
  const [experience, setExperience] = useState<ExperienceLevel>(currentUserProfile.experience_level);
  const [equipment, setEquipment] = useState<EquipmentType>(currentUserProfile.equipment_available);
  const [weight, setWeight] = useState(currentUserProfile.weight || 78);
  const [height, setHeight] = useState(currentUserProfile.height || 180);
  const [targetDays, setTargetDays] = useState(currentUserProfile.target_days_per_week || 4);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUserProfile,
      name: name.trim() || 'Սուրեն Հ.',
      goal,
      experience_level: experience,
      equipment_available: equipment,
      weight: Number(weight) || 75,
      height: Number(height) || 178,
      target_days_per_week: Number(targetDays) || 4,
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Օգտատիրոջ Պրոֆիլ & Onboarding
              </h2>
              <p className="text-xs text-slate-400">
                Անհատականացրեք Ձեր նպատակը և ստացեք AI-ի կողմից օպտիմալացված շաբաթական Split
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note about real-world camera limitation */}
        <div className="mx-6 mt-4 p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-500/30 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-200 leading-relaxed">
            <span className="font-semibold text-white">Իրատեսական մոտեցում.</span> Տեսախցիկով ճարպի կամ մկանային զանգվածի տոկոսի (%) գնահատումը մեկ նկարից անհուսալի է։ Մենք հաշվի ենք առնում Ձեր մուտքագրած հասակն ու քաշը, իսկ տեսախցիկն օգտագործում ենք{' '}
            <span className="text-indigo-300 underline">վարժության ֆորմայի (Pose Estimation) և կրկնությունների ավտոմատ հաշվարկի</span> համար։
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Անուն / Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Օրինակ՝ Սուրեն Հ."
              required
            />
          </div>

          {/* Goal Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Ձեր Գլխավոր Նպատակը</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'build_muscle', title: 'Մկանաշինություն', sub: 'Hypertrophy / Ծավալի աճ' },
                { id: 'lose_fat', title: 'Ճարպի այրում', sub: 'Fat Loss / Ռելիեֆ' },
                { id: 'strength', title: 'Ուժ և Հզորություն', sub: 'Strength / Ծանր կշիռներ' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id as GoalType)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    goal === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{item.title}</span>
                    {goal === item.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Փորձի Մակարդակ</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'beginner', title: 'Սկսնակ', sub: '0-6 ամիս' },
                { id: 'intermediate', title: 'Միջին', sub: '1-3 տարի' },
                { id: 'advanced', title: 'Փորձառու', sub: '3+ տարի' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setExperience(item.id as ExperienceLevel)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    experience === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Available */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
              <Dumbbell className="w-4 h-4 text-indigo-400" />
              <span>Հասանելի Սարքավորումներ</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'full_gym', title: 'Մարզասրահ (Full Gym)', sub: 'Ծանրաձող, տրենաժորներ' },
                { id: 'dumbbells_only', title: 'Միայն հանտելներ', sub: 'Dumbbells Only / Տուն' },
                { id: 'bodyweight', title: 'Մարմնի քաշով', sub: 'Calisthenics / Առանց գույքի' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEquipment(item.id as EquipmentType)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    equipment === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{item.title}</span>
                    {equipment === item.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Height, Weight & Days per week */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center space-x-1">
                <Scale className="w-3.5 h-3.5 text-indigo-400" />
                <span>Քաշ (կգ)</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="35"
                max="250"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Հասակ (սմ)
              </label>
              <input
                type="number"
                min="120"
                max="230"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Շաբաթական օրեր</span>
              </label>
              <select
                value={targetDays}
                onChange={e => setTargetDays(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="3">3 օր (Full Body / PPL)</option>
                <option value="4">4 օր (Upper / Lower)</option>
                <option value="5">5 օր (Bro Split)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-colors"
            >
              Չեղարկել
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Պահպանել & Գեներացնել Split
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
