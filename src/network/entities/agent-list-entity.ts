export interface User {
  _id: string;
  username: string;
}

export interface AgentListEntity {
  users: User[];
  success: boolean;
}
