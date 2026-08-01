/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Client-side Storage & Database Adapter (Firebase Firestore Compatible)
 * Implements local persistence via localStorage with pre-loaded demo history.
 */

import { generateWeeklySplit } from './splitGenerator.ts';
import { 
  UserProfile, 
  WorkoutSplit, 
  WorkoutSession, 
  ProgressPhoto,
  DayOfWeek
} from '../types/schema.ts';

const STORAGE_KEYS = {
  USER_PROFILE: 'ai_fitness_user_profile',
  WORKOUT_SPLIT: 'ai_fitness_workout_split',
  WORKOUT_SESSIONS: 'ai_fitness_workout_sessions',
  PROGRESS_PHOTOS: 'ai_fitness_progress_photos',
};

const DEFAULT_USER: UserProfile = {
  id: 'user_demo_01',
  name: 'Սուրեն Հ. (Demo User)',
  goal: 'build_muscle',
  experience_level: 'intermediate',
  equipment_available: 'full_gym',
  weight: 78.5, // kg
  height: 181,  // cm
  target_days_per_week: 4,
  created_at: '2026-07-01T10:00:00.000Z',
};

// Realistic pre-seeded workout session history for rich Recharts dashboard demo
const DEFAULT_SESSIONS: WorkoutSession[] = [
  {
    id: 'session_1',
    user_id: 'user_demo_01',
    date: '2026-07-06',
    split_day: 'Monday',
    title: 'Chest & Triceps / Կուրծք և Տրիցեպս',
    duration_minutes: 48,
    completed: true,
    created_at: '2026-07-06T18:00:00.000Z',
    exercises: [
      {
        exercise_id: 'chest_bench_press',
        sets: [
          { set_number: 1, weight: 75, reps: 10, rpe: 7, completed: true },
          { set_number: 2, weight: 75, reps: 9, rpe: 8, completed: true },
          { set_number: 3, weight: 80, reps: 8, rpe: 9, completed: true },
        ]
      },
      {
        exercise_id: 'shoulders_overhead_press',
        sets: [
          { set_number: 1, weight: 45, reps: 10, rpe: 7, completed: true },
          { set_number: 2, weight: 45, reps: 9, rpe: 8, completed: true },
        ]
      }
    ]
  },
  {
    id: 'session_2',
    user_id: 'user_demo_01',
    date: '2026-07-13',
    split_day: 'Monday',
    title: 'Chest & Triceps / Կուրծք և Տրիցեպս',
    duration_minutes: 52,
    completed: true,
    created_at: '2026-07-13T18:00:00.000Z',
    exercises: [
      {
        exercise_id: 'chest_bench_press',
        sets: [
          { set_number: 1, weight: 80, reps: 10, rpe: 7.5, completed: true },
          { set_number: 2, weight: 80, reps: 9, rpe: 8.5, completed: true },
          { set_number: 3, weight: 82.5, reps: 8, rpe: 9, completed: true },
        ]
      }
    ]
  },
  {
    id: 'session_3',
    user_id: 'user_demo_01',
    date: '2026-07-20',
    split_day: 'Monday',
    title: 'Chest & Triceps / Կուրծք և Տրիցեպս',
    duration_minutes: 50,
    completed: true,
    created_at: '2026-07-20T18:00:00.000Z',
    exercises: [
      {
        exercise_id: 'chest_bench_press',
        sets: [
          { set_number: 1, weight: 82.5, reps: 10, rpe: 8, completed: true },
          { set_number: 2, weight: 85, reps: 8, rpe: 8.5, completed: true },
          { set_number: 3, weight: 85, reps: 8, rpe: 9.5, completed: true },
        ]
      }
    ]
  },
  {
    id: 'session_4',
    user_id: 'user_demo_01',
    date: '2026-07-27',
    split_day: 'Monday',
    title: 'Chest & Triceps / Կուրծք և Տրիցեպս',
    duration_minutes: 55,
    completed: true,
    created_at: '2026-07-27T18:00:00.000Z',
    exercises: [
      {
        exercise_id: 'chest_bench_press',
        sets: [
          { set_number: 1, weight: 85, reps: 10, rpe: 8, completed: true },
          { set_number: 2, weight: 87.5, reps: 8, rpe: 9, completed: true },
          { set_number: 3, weight: 90, reps: 6, rpe: 9.5, completed: true },
        ]
      }
    ]
  }
];

// Pre-seeded progress photos for visual diff side-by-side comparison
const DEFAULT_PHOTOS: ProgressPhoto[] = [
  {
    id: 'photo_1',
    user_id: 'user_demo_01',
    date: '2026-06-01',
    pose_type: 'front',
    weight_at_time: 81.0,
    notes: 'Start of 8-week recomp cycle. Focus on chest & shoulder posture.',
    image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-06-01T10:00:00.000Z'
  },
  {
    id: 'photo_2',
    user_id: 'user_demo_01',
    date: '2026-07-28',
    pose_type: 'front',
    weight_at_time: 78.5,
    notes: '8 weeks later: noticeably leaner waist and fuller shoulders.',
    image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    created_at: '2026-07-28T10:00:00.000Z'
  }
];

export class LocalDatabaseService {
  /**
   * Get User Profile
   */
  static getUserProfile(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      this.saveUserProfile(DEFAULT_USER);
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  }

  /**
   * Save User Profile
   */
  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    // When profile changes, automatically regenerate split if not customized
    const split = generateWeeklySplit(profile);
    this.saveWorkoutSplit(split);
  }

  /**
   * Get Workout Split
   */
  static getWorkoutSplit(): WorkoutSplit {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_SPLIT);
    if (!raw) {
      const user = this.getUserProfile();
      const split = generateWeeklySplit(user);
      this.saveWorkoutSplit(split);
      return split;
    }
    try {
      return JSON.parse(raw);
    } catch {
      const user = this.getUserProfile();
      return generateWeeklySplit(user);
    }
  }

  /**
   * Save Workout Split
   */
  static saveWorkoutSplit(split: WorkoutSplit): void {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_SPLIT, JSON.stringify(split));
  }

  /**
   * Get all workout sessions
   */
  static getWorkoutSessions(): WorkoutSession[] {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_SESSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.WORKOUT_SESSIONS, JSON.stringify(DEFAULT_SESSIONS));
      return DEFAULT_SESSIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SESSIONS;
    }
  }

  /**
   * Save a completed workout session
   */
  static saveWorkoutSession(session: WorkoutSession): WorkoutSession[] {
    const sessions = this.getWorkoutSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    localStorage.setItem(STORAGE_KEYS.WORKOUT_SESSIONS, JSON.stringify(sessions));
    return sessions;
  }

  /**
   * Get progress photos
   */
  static getProgressPhotos(): ProgressPhoto[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS_PHOTOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, JSON.stringify(DEFAULT_PHOTOS));
      return DEFAULT_PHOTOS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PHOTOS;
    }
  }

  /**
   * Save new progress photo
   */
  static saveProgressPhoto(photo: ProgressPhoto): ProgressPhoto[] {
    const photos = this.getProgressPhotos();
    photos.unshift(photo);
    localStorage.setItem(STORAGE_KEYS.PROGRESS_PHOTOS, JSON.stringify(photos));
    return photos;
  }

  /**
   * Export all user data as JSON
   */
  static exportDataAsJSON(): string {
    return JSON.stringify({
      user: this.getUserProfile(),
      split: this.getWorkoutSplit(),
      sessions: this.getWorkoutSessions(),
      photos: this.getProgressPhotos(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  /**
   * Reset to demo defaults
   */
  static resetToDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_SPLIT);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS_PHOTOS);
  }
}
