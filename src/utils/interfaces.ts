export interface INewsExtended {
  _id: string;
  title: string;
  project: IProjectNewsroom;
  type: "update" | "release" | "feature";
  timestamp: number;
  content: string;
  thumbnail: string;
  featured?: string;
}

export interface IProjectNewsroom {
  _id: string;
  title: string;
  icon: string;
  website: string;
}
