export interface News {
  title: string;
  description: string;
  thumbnail: string;
  type: NewsType;
  project: Project;
  date: number;
  links?: NewsLink[];
}
export interface NewsLink {
  href: string;
  title: string;
}

export type NewsType = 'update' | 'release' | 'feature';
export type Project =
  | 'TC Components'
  | "Timo's Icons"
  | 'Portfolio'
  | 'Investing Collectors'
  | 'DHBW Richie'
  | "Timo's Translator"
  | 'NHL Stats'
  | 'AMS Pro';
