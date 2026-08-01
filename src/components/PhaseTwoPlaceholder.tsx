/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Construction } from 'lucide-react';

interface PhaseTwoPlaceholderProps {
  title: string;
  description: string;
}

export const PhaseTwoPlaceholder: React.FC<PhaseTwoPlaceholderProps> = ({ title, description }) => (
  <div className="max-w-2xl mx-auto p-8 text-center">
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12">
      <Construction className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 text-sm">{description}</p>
      <p className="text-xs text-slate-500 mt-4">Փուլ 2 — MediaPipe Pose ինտեգրում</p>
    </div>
  </div>
);
