// utils/types.ts
export interface Link {
  id: string;
  description: string;
  url: string;
  postedBy: User | null;
  votes: Pick<Vote, "id" | "user">[];
  createdAt: string;
}

export interface Feed {
  id: string;
  links: Link[];
  count: number;
}

export interface AuthPayload {
  token: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Vote {
  id: number;
  link: Link;
  user: Pick<User, "id">;
}
