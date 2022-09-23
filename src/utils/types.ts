// utils/types.ts
export interface Link {
  id: string;
  description: string;
  url: string;
}

export interface Feed {
  id: string;
  links: Link[];
}

export interface AuthPayload {
  token: string;
}
