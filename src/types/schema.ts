/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AI Fitness Coach MVP — Core Data Schema & Types
 * Compatible with Firebase Firestore, React Native, and Web.
 */

export type GoalType = 'build_muscle' | 'lose_fat' | 'strength' | 'general_fitness' | 'endurance';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type EquipmentType = 'full_gym' | 'dumbbells_only' | 'bodyweight' | 'home_gym';
export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'legs' 
  | 'core' 
  | 'cardio' 
  | 'full_body';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  goal: GoalType;
  experience_level: ExperienceLevel;
  equipment_available: EquipmentType;
  weight: number; // in kg (user manually entered, never guessed by camera)
  height: number; // in cm (user manually entered)
  target_days_per_week: number;
  created_at: string; // ISO date string
  avatar_url?: string;
}

export type DayOfWeek = 
  | 'Monday' 
  | 'Tuesday' 
  | 'Wednesday' 
  | 'Thursday' 
  | 'Friday' 
  | 'Saturday' 
  | 'Sunday';

export interface WorkoutSplitDay {
  day_of_week: DayOfWeek;
  day_name_hy: string; // Armenian display name e.g., "Երկուշաբթի"
  title: string;       // e.g., "Chest & Triceps / Կուրծք և Տրիցեպս"
  is_rest_day: boolean;
  muscle_groups: MuscleGroup[];
  exercise_ids: string[]; // Ordered list of exercise IDs for this day
}

export interface WorkoutSplit {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  days: Record<DayOfWeek, WorkoutSplitDay>;
}

export interface Exercise {
  id: string;
  name: string;
  name_hy: string;             // Armenian translation for UX
  muscle_group: MuscleGroup;
  secondary_muscles?: MuscleGroup[];
  equipment: string;
  difficulty: ExperienceLevel;
  video_url: string;           // Legal YouTube embed URL (e.g., https://www.youtube.com/embed/...)
  thumbnail_url?: string;
  instructions: string[];      // Form cues & technique guidance
  instructions_hy?: string[];  // Armenian form instructions
  default_sets: number;
  default_reps: string;        // e.g., "8-10" or "12-15"
}

export interface ExerciseSetLog {
  set_number: number;
  weight: number;              // kg
  reps: number;
  rpe: number;                 // Rate of Perceived Exertion (1 - 10)
  completed: boolean;
}

export interface ExerciseSessionLog {
  exercise_id: string;
  sets: ExerciseSetLog[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  date: string;                // ISO Date YYYY-MM-DD
  split_day: DayOfWeek;
  title: string;
  duration_minutes: number;
  exercises: ExerciseSessionLog[];
  completed: boolean;
  created_at: string;
}

export interface LandmarkPoint {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface ProgressPhoto {
  id: string;
  user_id: string;
  date: string;                // YYYY-MM-DD
  image_url: string;           // Base64 or Cloud Storage URL
  pose_type: 'front' | 'side' | 'back' | 'flex';
  weight_at_time?: number;     // kg
  notes?: string;
  pose_landmarks?: LandmarkPoint[]; // JSON array from MediaPipe Pose
  created_at: string;
}

export interface AICoachAdviceResponse {
  summary: string;
  tips: string[];
  progressive_overload_recommendation: string;
  form_focus: string;
}
