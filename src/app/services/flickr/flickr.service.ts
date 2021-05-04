import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlickrGallery, FlickrItem, FlickrPhoto, FlickrPublicApiResponse } from 'src/app/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private flickrApiRoute = 'https://www.flickr.com/services/feeds/photos_public.gne';
  private defaultTags = ['safe'];
  private flickrDefaultLink = 'https://www.flickr.com/photos/';

  constructor(private http: HttpClient) { }

  public getFlickrGallery(tags: string[] = []): Observable<FlickrGallery> {
    return this.getFlickrData(tags)
      .pipe(map(data => {
        return {
          photos: this.parseItems(data.items),
          tags
        }
      }));
  }

  public getFlickrData(tags: string[] = []): Observable<FlickrPublicApiResponse> {
    let params = new HttpParams()
      .append('format', 'json')
      .append('jsoncallback', 'JSONP_CALLBACK')
      .append('tags', [...this.defaultTags, ...tags].join(','));

    return this.getJsonp<FlickrPublicApiResponse>(this.flickrApiRoute, params);
  }

  private getJsonp<T>(url: string, params: HttpParams, callback = 'JSONP_CALLBACK'): Observable<T> {
    return this.http.jsonp<T>(`${url}?${params.toString()}`, callback);
  }

  private parseItems(items: FlickrItem[]): FlickrPhoto[] {
    return items.map(i => {
      return {
        ...i,
        author: this.parseAuthor(i.author),
        author_profile: this.getAuthorProfileLink(i.link),
        media: i.media.m,
        tags: i.tags.split(' ')
      };
    });
  }

  private parseAuthor(author: string): string {
    return author.replace('nobody@flickr.com', '').replace(/(\(\")|(\"\))/g, '');
  }

  private getAuthorProfileLink(photoLink: string): string {
    return photoLink.match(/.*(photos\/[^\/]*)/g)?.toString() || this.flickrDefaultLink;
  }

}
