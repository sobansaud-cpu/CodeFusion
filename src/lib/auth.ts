import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserProfile } from "@/types";
import { auth, db } from './firebase';

export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(result.user);
  return result;
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const today = new Date().toISOString().split('T')[0];
    const userData: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      plan: 'free',
      dailyGenerations: 0,
      lastGenerationDate: today,
      maxSites: 3,
      sitesUsed: 0,
      createdAt: today
    };

    await setDoc(userRef, userData);
    return userData;
  }
  return userSnap.data() as UserProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() as UserProfile : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const canUserGenerate = async (uid: string): Promise<{ 
  canGenerate: boolean; 
  remaining: number 
}> => {
  const userProfile = await getUserProfile(uid);
  if (!userProfile) return { canGenerate: false, remaining: 0 };

  const today = new Date().toISOString().split('T')[0];
  const isNewDay = userProfile.lastGenerationDate !== today;

  let dailyGenerations = isNewDay ? 0 : userProfile.dailyGenerations;
  let maxDaily = userProfile.plan === 'free' ? 3 : 
                userProfile.plan === 'pro' ? 20 : 
                Infinity; // Unlimited

  const canGenerate = maxDaily === Infinity || dailyGenerations < maxDaily;
  const remaining = maxDaily === Infinity ? Infinity : Math.max(0, maxDaily - dailyGenerations);

  return { canGenerate, remaining };
};

export const incrementUserGeneration = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userProfile = await getUserProfile(uid);
  if (!userProfile) return;

  const today = new Date().toISOString().split('T')[0];
  const isNewDay = userProfile.lastGenerationDate !== today;

  const updatedData = {
    dailyGenerations: isNewDay ? 1 : userProfile.dailyGenerations + 1,
    lastGenerationDate: today,
    ...(isNewDay && { sitesUsed: userProfile.sitesUsed + 1 })
  };

  await setDoc(userRef, updatedData, { merge: true });
};