export type Tags = string;

export type Post = {
  title: string;
  date: string;
  slug: string;
  published: boolean;
  summary: string;
  content: string;
  body: string;
  tags: Tags[];
};

export type WorkSample = {
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
};
