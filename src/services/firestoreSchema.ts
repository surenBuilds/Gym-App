/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Firestore Schema & Security Rules Definition for AI Fitness Coach MVP
 * 
 * Collections & Document Paths:
 * ===========================================================================
 * 1. users / {userId}
 *    - Schema: UserProfile
 *    - Indexes: email (asc)
 * 
 * 2. users / {userId} / workout_splits / {splitId}
 *    - Schema: WorkoutSplit
 *    - Indexes: created_at (desc)
 * 
 * 3. exercises / {exerciseId}
 *    - Schema: Exercise
 *    - Indexes: muscle_group (asc), difficulty (asc)
 * 
 * 4. users / {userId} / workout_sessions / {sessionId}
 *    - Schema: WorkoutSession
 *    - Indexes: date (desc), split_day (asc)
 * 
 * 5. users / {userId} / progress_photos / {photoId}
 *    - Schema: ProgressPhoto
 *    - Indexes: date (desc), pose_type (asc)
 * ===========================================================================
 */

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  WORKOUT_SPLITS: 'workout_splits',
  EXERCISES: 'exercises',
  WORKOUT_SESSIONS: 'workout_sessions',
  PROGRESS_PHOTOS: 'progress_photos',
} as const;

/**
 * Example Firestore Security Rules for Firebase Console:
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     
 *     // Public exercise catalog read, admin write
 *     match /exercises/{exerciseId} {
 *       allow read: if true;
 *       allow write: if false; // Managed by backend / admin
 *     }
 *     
 *     // User data access limited to authenticated user ID
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *       
 *       match /workout_splits/{splitId} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *       match /workout_sessions/{sessionId} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *       match /progress_photos/{photoId} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *     }
 *   }
 * }
 */
