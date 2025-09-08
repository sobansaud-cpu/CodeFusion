
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please set it to the path of your service account JSON file.');
}

const serviceAccount = JSON.parse(
  readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, 'utf-8')
);

const app = getApps().length === 0 
  ? initializeApp({
      credential: cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    })
  : getApps()[0];

const db = getFirestore(app);

export const auth = {
  async getUserProjects(userId: string) {
    try {
      const snapshot = await db.collection('projects')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Firestore Error:', error);
      throw new Error('Failed to fetch projects');
    }
  },

  async deleteProject(projectId: string) {
    try {
      await db.collection('projects').doc(projectId).delete();
      return { success: true };
    } catch (error) {
      console.error('Firestore Error:', error);
      throw new Error('Failed to delete project');
    }
  }
};