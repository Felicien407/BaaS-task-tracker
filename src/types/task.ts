export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  ownerId: string; // added beyond the Day 1 spec — required so Firestore rules
                    // can verify a user only touches their own tasks (see Day 4)
  createdAt: any;   // Firestore Timestamp at runtime
}
