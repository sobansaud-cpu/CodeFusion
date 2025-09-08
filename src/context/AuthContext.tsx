'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signOutUser } from '@/lib/auth';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setUserProfile: (profile: UserProfile) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const setUserProfile = async (profile: UserProfile) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, profile, { merge: true });
    setUserProfileState(profile);
  };

  const refreshUserProfile = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserProfileState(docSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            let profile = docSnap.data() as UserProfile;
            // Check expiry for Pro plan
            if (profile.plan === 'pro' && profile.planExpiry) {
              const now = new Date();
              const expiry = new Date(profile.planExpiry);
              if (expiry < now) {
                // Downgrade to Free if expired
                profile = {
                  ...profile,
                  plan: 'free',
                  maxDailyGenerations: 3,
                  planExpiry: undefined,
                };
                await setDoc(userRef, profile, { merge: true });
              }
            }
            setUserProfileState(profile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              plan: 'free',
              dailyGenerations: 0,
              maxDailyGenerations: 3,
              lastGenerationDate: new Date().toISOString(),
              maxSites: 3,
              sitesUsed: 0,
              createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            setUserProfileState(newProfile);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
          setUserProfileState(null);
        }
      } else {
        setUserProfileState(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await signOutUser();
    setUser(null);
    setUserProfileState(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      loading,
      setUserProfile,
      refreshUserProfile, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
