export interface JobInput {
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
}

export interface JobOutput {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
