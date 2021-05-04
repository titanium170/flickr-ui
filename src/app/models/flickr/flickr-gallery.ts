export interface FlickrGallery {
  photos: FlickrPhoto[];
  tags: string[];
}

export interface FlickrPhoto {
  author: string;
  author_id: string;
  author_profile?: string;
  date_taken: string;
  description: string;
  link: string;
  media: string;
  published: string;
  tags: string[];
  title: string;
}
