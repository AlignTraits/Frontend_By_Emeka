interface EntityId {
  id: string;
  name: string;
}

interface Metadata {
  fileName: string;
  failedCount: number;
  successCount: number;
  failedMessages: string[];
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailVerified: string | null;
  password: string;
  role: string;
  contactNumber: string | null;
  createdAt: string;
  gender: string | null;
  dob: string | null;
  ageRange: string | null;
  region: string | null;
  bio: string | null;
  image: string | null;
  updatedAt: string;
  otherSkill: string | null;
}

export interface ApiResponseItem {
  id: string;
  action: string;
  entity: string;
  entityIds: EntityId[];
  metadata: Metadata;
  userId: string;
  timestamp: string;
  user: User;
}