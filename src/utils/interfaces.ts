export interface INewsExtended {
  id: string;
  title: string;
  project: IProjectNewsroom;
  type: 'update' | 'release' | 'feature';
  timestamp: number;
  content: string;
  thumbnail: string;
  featured?: string;
}

export interface IProjectNewsroom {
  id: string;
  title: string;
  icon: string;
  website: string;
}
