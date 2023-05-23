export interface INewPhoneBook {
  name: string;
  number: string;
}

export interface IPhoneBook extends INewPhoneBook {
  id: number;
}
