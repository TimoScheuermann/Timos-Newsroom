export interface News {
  title: string;
  description: string;
  thumbnail: string;
  type: NewsType;
  project?: Project;
  date: Date;
}

export type NewsType = 'update' | 'change' | 'feature';
export type Project =
  | 'TC Components'
  | "Timo's Icons"
  | 'Portfolio'
  | 'Investing Collectors'
  | 'DHBW Richie';
