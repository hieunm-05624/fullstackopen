export interface INewNote{
    content: string;
    important: boolean;
}

export interface INote extends INewNote {
    id: number;
  }
  