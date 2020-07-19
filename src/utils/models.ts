export interface News {
  _id?: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  project: string;
  hasBackground: boolean;
  date: number;
  links: NewsLink[];
}

export interface NewsLink {
  href: string;
  title: string;
}
