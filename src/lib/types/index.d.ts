export type Categories = string;

export type Post = {
  title: string;
  date: string;
  slug: string;
  published: boolean;
  summary: string;
  content: string;
  body: string;
  categories: Categories[];
};
