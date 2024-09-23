export interface User {
    id: number;
    username: string;
    company: string;
    type: string;  // 'admin' or 'user'
    isActive: boolean;
  }
  