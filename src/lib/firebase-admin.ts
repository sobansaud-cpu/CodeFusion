// import { cert, initializeApp, getApps } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';

// if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
//   throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please set it to the JSON string of your service account.');
// }

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// const app = getApps().length === 0 
//   ? initializeApp({
//       credential: cert(serviceAccount),
//       databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
//     })
//   : getApps()[0];

// export const db = getFirestore(app);

// export const auth = {
//   async getUserProjects(userId: string) {
//     try {
//       const snapshot = await db.collection('projects')
//         .where('userId', '==', userId)
//         .orderBy('createdAt', 'desc')
//         .get();

//       return snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//     } catch (error) {
//       console.error('Firestore Error:', error);
//       throw new Error('Failed to fetch projects');
//     }
//   },

//   async deleteProject(projectId: string) {
//     try {
//       await db.collection('projects').doc(projectId).delete();
//       return { success: true };
//     } catch (error) {
//       console.error('Firestore Error:', error);
//       throw new Error('Failed to delete project');
//     }
//   }
// };



import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please set it to the JSON string of your service account, or the path to the service account file, or the base64-encoded JSON.');
}

function parseServiceAccount(raw: string) {
  // Try direct JSON
  try {
    return JSON.parse(raw);
  } catch (err) {
    // Not raw JSON — try treating it as a file path
  }

  // If it looks like a path (starts with ./ or / or a windows-ish drive letter), try to read the file
  const maybePath = raw;
  try {
    // Resolve relative paths from project root
    const resolved = path.isAbsolute(maybePath) ? maybePath : path.resolve(process.cwd(), maybePath);
    if (fs.existsSync(resolved)) {
      const file = fs.readFileSync(resolved, 'utf8');
      return JSON.parse(file);
    }
  } catch (err) {
    // fall through to next attempt
  }

  // Maybe it's base64 encoded JSON
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (err) {
    // give up with a helpful error
  }

  throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON, not a readable file path, and not valid base64-encoded JSON. Set the env var to the JSON string (escape newlines), provide an absolute/relative path to the service account JSON file, or set the base64 encoded JSON.');
}

const serviceAccount = parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT as string);

const app = getApps().length === 0
  ? initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  })
  : getApps()[0];

export const db = getFirestore(app);

export const auth = {
  async getUserProjects(userId: string) {
    try {
      const snapshot = await db.collection('projects')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map((doc: any) => ({
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