/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Built-in Exercise Library with Legal YouTube Embed Videos (YouTube Data API / embed URLs)
 */

import { Exercise } from '../types/schema.ts';

export const EXERCISE_LIBRARY: Exercise[] = [
  // --- CHEST ---
  {
    id: 'chest_bench_press',
    name: 'Barbell Bench Press',
    name_hy: 'Ծանրաձողով պառկած սեղմում (Bench Press)',
    muscle_group: 'chest',
    secondary_muscles: ['triceps', 'shoulders'],
    equipment: 'Barbell & Bench',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg', // Clean form demo
    instructions: [
      'Keep feet flat on the ground and arch your upper back slightly.',
      'Lower the bar with control to mid-chest.',
      'Press explosively while keeping elbows tucked at ~45 degrees.'
    ],
    instructions_hy: [
      'Ոտքերը հաստատուն դրեք գետնին և թեթևակի կամարեք մեջքի վերին հատվածը:',
      'Ծանրաձողը վերահսկողությամբ իջեցրեք կրծքավանդակի մեջտեղի հատված:',
      'Սեղմեք վերև՝ արմունկները պահելով մոտ 45 աստիճան անկյան տակ:'
    ],
    default_sets: 4,
    default_reps: '8-10'
  },
  {
    id: 'chest_dumbbell_incline_press',
    name: 'Incline Dumbbell Press',
    name_hy: 'Թեք նստարանին հանտելների սեղմում',
    muscle_group: 'chest',
    secondary_muscles: ['shoulders', 'triceps'],
    equipment: 'Dumbbells & Incline Bench',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
    instructions: [
      'Set bench to a 30-45 degree incline.',
      'Lower dumbbells until you feel a deep stretch in upper chest.',
      'Press up and bring dumbbells slightly together at the top.'
    ],
    instructions_hy: [
      'Նստարանը դրեք 30-45 աստիճան թեքության վրա:',
      'Իջեցրեք հանտելները մինչև զգաք ձգվածություն կրծքի վերին հատվածում:',
      'Սեղմեք վերև և վերևում թեթևակի մոտեցրեք իրար:'
    ],
    default_sets: 3,
    default_reps: '10-12'
  },
  {
    id: 'chest_pushups',
    name: 'Push-Ups (Standard)',
    name_hy: 'Հրում հատակից (Push-Ups)',
    muscle_group: 'chest',
    secondary_muscles: ['triceps', 'shoulders', 'core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/IODxDxX7oi4',
    instructions: [
      'Maintain a rigid plank from head to heels.',
      'Lower until chest is an inch from the floor.',
      'Push back up to full elbow extension.'
    ],
    instructions_hy: [
      'Պահպանեք ուղիղ դիրք գլխից մինչև կրունկները (պլանկա):',
      'Իջեք մինչև կուրծքը գրեթե դիպչի հատակին:',
      'Հրեք մարմինը վեր՝ մինչև արմունկների ամբողջական բացվելը:'
    ],
    default_sets: 3,
    default_reps: '15-20'
  },

  // --- BACK ---
  {
    id: 'back_lat_pulldown',
    name: 'Wide-Grip Lat Pulldown',
    name_hy: 'Վերին բլոկի ձգում դեպի կուրծք (Lat Pulldown)',
    muscle_group: 'back',
    secondary_muscles: ['biceps'],
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
    instructions: [
      'Grip the bar wider than shoulder-width.',
      'Pull down to upper chest while depressing shoulder blades.',
      'Return slowly to get a full stretch in the lats.'
    ],
    instructions_hy: [
      'Բռնեք ձողը ուսերից մի փոքր լայն:',
      'Ձգեք դեպի կրծքի վերին մասը՝ ուսի թիակները իջեցնելով:',
      'Դանդաղ վերադարձրեք ելման դիրք՝ մկանները ձգելու համար:'
    ],
    default_sets: 4,
    default_reps: '10-12'
  },
  {
    id: 'back_barbell_row',
    name: 'Bent-Over Barbell Row',
    name_hy: 'Ծանրաձողի ձգում թեքված դիրքում',
    muscle_group: 'back',
    secondary_muscles: ['biceps', 'core'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/6FZHJGzMGMc',
    instructions: [
      'Hinge at hips with a flat back at roughly 45 degrees.',
      'Pull the bar toward your belly button.',
      'Squeeze shoulder blades together at top.'
    ],
    instructions_hy: [
      'Թեքվեք առաջ կոնքերից՝ մեջքը պահելով ուղիղ, մոտ 45 աստիճան:',
      'Ձգեք ծանրաձողը դեպի որովայնի ստորին հատվածը:',
      'Վերևում սեղմեք թիակները իրար:'
    ],
    default_sets: 4,
    default_reps: '8-10'
  },
  {
    id: 'back_pullups',
    name: 'Pull-Ups',
    name_hy: 'Ձգումներ պտտաձողի վրա (Pull-Ups)',
    muscle_group: 'back',
    secondary_muscles: ['biceps', 'core'],
    equipment: 'Pull-up Bar / Bodyweight',
    difficulty: 'advanced',
    video_url: 'https://www.youtube.com/embed/eGo4IYlbE5g',
    instructions: [
      'Grip bar slightly wider than shoulder width.',
      'Pull chin over the bar without swinging your legs.',
      'Lower all the way down to a dead hang.'
    ],
    instructions_hy: [
      'Բռնեք ձողը ուսերից մի փոքր լայն:',
      'Բարձրացեք մինչև կզակը անցնի ձողից՝ առանց ոտքերը ճոճելու:',
      'Իջեք ամբողջությամբ՝ մինչև ձեռքերի ուղղվելը:'
    ],
    default_sets: 3,
    default_reps: '6-10'
  },

  // --- SHOULDERS ---
  {
    id: 'shoulders_overhead_press',
    name: 'Overhead Shoulder Press (OHP)',
    name_hy: 'Ուսերի սեղմում կանգնած (Overhead Press)',
    muscle_group: 'shoulders',
    secondary_muscles: ['triceps', 'core'],
    equipment: 'Barbell or Dumbbells',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/QAQ64hK4Xxs',
    instructions: [
      'Press the weight straight up overhead while bracing your core.',
      'Lock out elbows at the top without hyperextending lower back.',
      'Lower under control to collarbone level.'
    ],
    instructions_hy: [
      'Սեղմեք քաշը ուղիղ վերև՝ լարելով որովայնի մկանները:',
      'Վերևում ուղղեք արմունկները՝ առանց գոտկատեղը ճկելու:',
      'Վերահսկելով իջեցրեք մինչև անրակի մակարդակ:'
    ],
    default_sets: 4,
    default_reps: '8-10'
  },
  {
    id: 'shoulders_lateral_raise',
    name: 'Dumbbell Lateral Raise',
    name_hy: 'Հանտելների բարձրացում կողք (Lateral Raise)',
    muscle_group: 'shoulders',
    secondary_muscles: [],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/3VcKaXpzqRo',
    instructions: [
      'Stand tall with a slight bend in the elbows.',
      'Raise dumbbells out to the sides until parallel with shoulders.',
      'Lead with your elbows and lower slowly.'
    ],
    instructions_hy: [
      'Կանգնեք ուղիղ, արմունկները թեթևակի ծալված:',
      'Բարձրացրեք հանտելները կողքեր՝ մինչև ուսերի մակարդակը:',
      'Առաջնորդվեք արմունկներով և իջեցրեք դանդաղ:'
    ],
    default_sets: 4,
    default_reps: '12-15'
  },

  // --- BICEPS ---
  {
    id: 'biceps_barbell_curl',
    name: 'Barbell Bicep Curl',
    name_hy: 'Ծանրաձողով բիցեպսի ծալում (Barbell Curl)',
    muscle_group: 'biceps',
    secondary_muscles: [],
    equipment: 'Barbell / EZ Bar',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
    instructions: [
      'Keep elbows pinned to your sides throughout the movement.',
      'Curl the bar up toward your shoulders, squeezing the biceps.',
      'Lower slowly without swinging your torso.'
    ],
    instructions_hy: [
      'Արմունկները պահեք իրանի կողքին ամբողջ վարժության ընթացքում:',
      'Ծալեք ձողը դեպի ուսերը՝ սեղմելով բիցեպսը:',
      'Իջեցրեք դանդաղ՝ առանց մարմինը ճոճելու:'
    ],
    default_sets: 3,
    default_reps: '10-12'
  },
  {
    id: 'biceps_hammer_curl',
    name: 'Dumbbell Hammer Curls',
    name_hy: 'Մուրճ (Hammer Curls) հանտելներով',
    muscle_group: 'biceps',
    secondary_muscles: [],
    equipment: 'Dumbbells',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/zC3nLlEvin4',
    instructions: [
      'Hold dumbbells with a neutral grip (palms facing each other).',
      'Curl upward keeping wrists straight.',
      'Great for brachialis and forearm thickness.'
    ],
    instructions_hy: [
      'Բռնեք հանտելները չեզոք դիրքով (ափերը իրար նայող):',
      'Ծալեք ձեռքերը վերև՝ դաստակները պահելով ուղիղ:',
      'Հիանալի է նախաբազկի և բիցեպսի հաստության համար:'
    ],
    default_sets: 3,
    default_reps: '10-12'
  },

  // --- TRICEPS ---
  {
    id: 'triceps_rope_pushdown',
    name: 'Tricep Rope Pushdown',
    name_hy: 'Տրիցեպսի ձգում պարանով (Rope Pushdown)',
    muscle_group: 'triceps',
    secondary_muscles: [],
    equipment: 'Cable Machine',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/vB5OHsJ3EME',
    instructions: [
      'Attach a rope to the high cable pulley.',
      'Keep upper arms stationary and push down until arms lock out.',
      'Spread the rope ends apart at the bottom for maximum contraction.'
    ],
    instructions_hy: [
      'Ամրացրեք պարանը վերին բլոկին:',
      'Վերին բազուկները անշարժ պահելով՝ հրեք ներքև մինչև ձեռքերի ուղղվելը:',
      'Ներքևում բացեք պարանի ծայրերը մաքսիմալ կծկման համար:'
    ],
    default_sets: 4,
    default_reps: '12-15'
  },
  {
    id: 'triceps_skullcrusher',
    name: 'EZ-Bar Skullcrushers',
    name_hy: 'Ֆրանսիական սեղմում պառկած (Skullcrusher)',
    muscle_group: 'triceps',
    secondary_muscles: [],
    equipment: 'EZ Bar & Bench',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/d_KZxkY_0cM',
    instructions: [
      'Lie flat on bench holding EZ bar above your chest.',
      'Lower the bar toward your forehead by bending only at the elbows.',
      'Extend elbows back to starting position.'
    ],
    instructions_hy: [
      'Պառկեք նստարանին՝ ձողը պահելով կրծքի վերևում:',
      'Իջեցրեք ձողը դեպի ճակատը՝ ծալելով միայն արմունկները:',
      'Ուղղեք արմունկները ելման դիրք:'
    ],
    default_sets: 3,
    default_reps: '10-12'
  },

  // --- LEGS ---
  {
    id: 'legs_barbell_squat',
    name: 'Barbell Back Squat',
    name_hy: 'Ծանրաձողով կքանիստ (Barbell Squat)',
    muscle_group: 'legs',
    secondary_muscles: ['core'],
    equipment: 'Barbell & Squat Rack',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/gcNh17Ckjgg',
    instructions: [
      'Place bar across upper traps and brace your core.',
      'Squat down until thighs are parallel to the floor.',
      'Drive through your whole foot to stand back up.'
    ],
    instructions_hy: [
      'Ծանրաձողը դրեք տրապեցիայի վրա և լարեք որովայնը:',
      'Իջեք մինչև ազդրերը լինեն զուգահեռ հատակին:',
      'Հրվեք ամբողջ ոտնաթաթով և բարձրացեք ելման դիրք:'
    ],
    default_sets: 4,
    default_reps: '8-10'
  },
  {
    id: 'legs_romanian_deadlift',
    name: 'Romanian Deadlift (RDL)',
    name_hy: 'Ռումինական ձգում (RDL)',
    muscle_group: 'legs',
    secondary_muscles: ['back', 'core'],
    equipment: 'Barbell or Dumbbells',
    difficulty: 'intermediate',
    video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
    instructions: [
      'Hinge at the hips while keeping shins relatively vertical.',
      'Lower bar along your shins until you feel hamstring stretch.',
      'Squeeze glutes to return to standing.'
    ],
    instructions_hy: [
      'Թեքվեք կոնքերից՝ սրունքները պահելով գրեթե ուղղահայաց:',
      'Իջեցրեք ձողը սրունքների երկայնքով մինչև ազդրի հետին մկանների ձգվելը:',
      'Սեղմեք հետույքի մկանները կանգնելու համար:'
    ],
    default_sets: 3,
    default_reps: '10-12'
  },
  {
    id: 'legs_lunges',
    name: 'Walking Lunges',
    name_hy: 'Քայլքով արտաքայլեր (Walking Lunges)',
    muscle_group: 'legs',
    secondary_muscles: ['core'],
    equipment: 'Dumbbells or Bodyweight',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/L8fvypPrzzs',
    instructions: [
      'Step forward and lower back knee until roughly 1 inch off floor.',
      'Keep torso upright and front knee over your ankle.',
      'Push off front foot to step into the next lunge.'
    ],
    instructions_hy: [
      'Քայլեք առաջ և իջեք մինչև հետևի ծունկը գրեթե դիպչի հատակին:',
      'Իրանը պահեք ուղիղ, իսկ առջևի ծունկը՝ կրունկի վերևում:',
      'Հրվեք առջևի ոտքով դեպի հաջորդ քայլը:'
    ],
    default_sets: 3,
    default_reps: '12-16'
  },

  // --- CORE & CARDIO ---
  {
    id: 'core_plank',
    name: 'Forearm Plank',
    name_hy: 'Պլանկա նախաբազուկների վրա',
    muscle_group: 'core',
    secondary_muscles: ['shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    video_url: 'https://www.youtube.com/embed/ASdvN_XEl_c',
    instructions: [
      'Rest on forearms and toes with body in a straight line.',
      'Squeeze glutes and brace abs tightly.',
      'Hold for time without letting hips sag.'
    ],
    instructions_hy: [
      'Հենվեք նախաբազուկների և ոտնաթաթերի վրա՝ մարմինը ուղիղ գծով:',
      'Սեղմեք հետույքը և ուժեղ լարեք որովայնի մկանները:',
      'Պահեք դիրքը՝ առանց կոնքը իջեցնելու:'
    ],
    default_sets: 3,
    default_reps: '45-60s'
  }
];

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISE_LIBRARY.find(ex => ex.id === id);
}

export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return EXERCISE_LIBRARY.filter(
    ex => ex.muscle_group === muscleGroup || ex.secondary_muscles?.includes(muscleGroup as any)
  );
}
