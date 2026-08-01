/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Weekly Split Generator (Rule-based for instant MVP response + AI coach compatibility)
 */

import { EXERCISE_LIBRARY } from '../data/exerciseLibrary.ts';
import { DayOfWeek, UserProfile, WorkoutSplit, WorkoutSplitDay } from '../types/schema.ts';

const DAYS_ORDER: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const ARMENIAN_DAYS: Record<DayOfWeek, string> = {
  Monday: 'Երկուշաբթի',
  Tuesday: 'Երեքշաբթի',
  Wednesday: 'Չորեքշաբթի',
  Thursday: 'Հինգշաբթի',
  Friday: 'Ուրբաթ',
  Saturday: 'Շաբաթ',
  Sunday: 'Կիրակի'
};

/**
 * Generates an optimized weekly workout split based on user profile rules
 */
export function generateWeeklySplit(user: UserProfile): WorkoutSplit {
  const targetDays = user.target_days_per_week || 4;
  const days: Record<DayOfWeek, WorkoutSplitDay> = {} as Record<DayOfWeek, WorkoutSplitDay>;

  // Filter exercises based on equipment if bodyweight only
  const availableExercises = EXERCISE_LIBRARY.filter(ex => {
    if (user.equipment_available === 'bodyweight') {
      return ex.equipment.toLowerCase().includes('bodyweight');
    }
    return true;
  });

  const getExerciseIdsForMuscle = (muscles: string[]): string[] => {
    return availableExercises
      .filter(ex => muscles.includes(ex.muscle_group))
      .map(ex => ex.id);
  };

  if (targetDays <= 3) {
    // 3-Day Full Body or Push / Pull / Legs
    days['Monday'] = createWorkoutDay('Monday', 'Push Day (Chest, Shoulders, Triceps) / Հրում', false, ['chest', 'shoulders', 'triceps'], getExerciseIdsForMuscle(['chest', 'shoulders', 'triceps']));
    days['Tuesday'] = createRestDay('Tuesday');
    days['Wednesday'] = createWorkoutDay('Wednesday', 'Pull Day (Back, Biceps) / Ձգում', false, ['back', 'biceps'], getExerciseIdsForMuscle(['back', 'biceps']));
    days['Thursday'] = createRestDay('Thursday');
    days['Friday'] = createWorkoutDay('Friday', 'Legs & Core / Ոտքեր և Որովայն', false, ['legs', 'core'], getExerciseIdsForMuscle(['legs', 'core']));
    days['Saturday'] = createRestDay('Saturday');
    days['Sunday'] = createRestDay('Sunday');
  } else if (targetDays === 4) {
    // 4-Day Upper / Lower Split
    days['Monday'] = createWorkoutDay('Monday', 'Chest & Triceps / Կուրծք և Տրիցեպս', false, ['chest', 'triceps'], getExerciseIdsForMuscle(['chest', 'triceps']));
    days['Tuesday'] = createWorkoutDay('Tuesday', 'Back & Biceps / Մեջք և Բիցեպս', false, ['back', 'biceps'], getExerciseIdsForMuscle(['back', 'biceps']));
    days['Wednesday'] = createRestDay('Wednesday');
    days['Thursday'] = createWorkoutDay('Thursday', 'Shoulders & Core / Ուսեր և Որովայն', false, ['shoulders', 'core'], getExerciseIdsForMuscle(['shoulders', 'core']));
    days['Friday'] = createWorkoutDay('Friday', 'Legs Day / Ոտքեր', false, ['legs'], getExerciseIdsForMuscle(['legs']));
    days['Saturday'] = createRestDay('Saturday');
    days['Sunday'] = createRestDay('Sunday');
  } else {
    // 5-Day Bro Split (Default for High Frequency)
    days['Monday'] = createWorkoutDay('Monday', 'Chest Day / Կուրծք', false, ['chest'], getExerciseIdsForMuscle(['chest', 'core']));
    days['Tuesday'] = createWorkoutDay('Tuesday', 'Back Day / Մեջք', false, ['back'], getExerciseIdsForMuscle(['back']));
    days['Wednesday'] = createWorkoutDay('Wednesday', 'Shoulders Day / Ուսեր', false, ['shoulders'], getExerciseIdsForMuscle(['shoulders']));
    days['Thursday'] = createWorkoutDay('Thursday', 'Legs Day / Ոտքեր', false, ['legs'], getExerciseIdsForMuscle(['legs']));
    days['Friday'] = createWorkoutDay('Friday', 'Arms Day (Biceps & Triceps) / Ձեռքեր', false, ['biceps', 'triceps'], getExerciseIdsForMuscle(['biceps', 'triceps']));
    days['Saturday'] = createRestDay('Saturday');
    days['Sunday'] = createRestDay('Sunday');
  }

  return {
    id: `split_${user.id}_${Date.now()}`,
    user_id: user.id,
    name: `${user.goal === 'build_muscle' ? 'Hypertrophy' : user.goal === 'lose_fat' ? 'Fat Loss' : 'Strength'} ${targetDays}-Day Split`,
    created_at: new Date().toISOString(),
    days
  };
}

function createWorkoutDay(
  day_of_week: DayOfWeek,
  title: string,
  is_rest_day: boolean,
  muscle_groups: any[],
  exercise_ids: string[]
): WorkoutSplitDay {
  return {
    day_of_week,
    day_name_hy: ARMENIAN_DAYS[day_of_week],
    title,
    is_rest_day,
    muscle_groups,
    exercise_ids
  };
}

function createRestDay(day_of_week: DayOfWeek): WorkoutSplitDay {
  return {
    day_of_week,
    day_name_hy: ARMENIAN_DAYS[day_of_week],
    title,
    is_rest_day: true,
    muscle_groups: [],
    exercise_ids: []
  };
}

/**
 * Helper: Get current day of week in English ('Monday' ... 'Sunday')
 */
export function getCurrentDayOfWeek(): DayOfWeek {
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
}
