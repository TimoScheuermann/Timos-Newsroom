export interface News {
  _id?: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  project: string;
  hasBackground: boolean;
  date: number | string;
  links: NewsLink[];
}

export interface NewsLink {
  href: string;
  title: string;
}

export interface User {
  readonly _id: string;
  readonly googleId?: number;
  readonly givenName: string;
  readonly familyName: string;
  readonly email: string;
  readonly avatar: string;
  readonly token: string;
  readonly date: number;
  readonly group: string;
}
