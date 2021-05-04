export interface FlickrPublicApiResponse {
  description: string;
  generator: string;
  items: FlickrItem[];
  link: string;
  modified: string;
  title: string;
}

export interface FlickrItem {
  author: string;
  author_id: string;
  date_taken: string;
  description: string;
  link: string;
  media: FlickrMedia;
  published: string;
  tags: string;
  title: string;
}

export interface FlickrMedia {
  m: string;
}


