import { Component, OnInit } from '@angular/core';
import { FlickrPhoto} from 'src/app/models';
import { FlickrService } from 'src/app/services/flickr/flickr.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public photos$!: Observable<FlickrPhoto[]>;

  constructor(private flickr: FlickrService) { }

  ngOnInit(): void {
    this.photos$ = this.flickr.getFlickrGallery(['animal', 'nature', 'tree'])
    .pipe(map(data => data.photos));
  }

  search(tags: string[]): void {
    this.photos$ = this.flickr.getFlickrGallery(tags)
    .pipe(map(data => data.photos));
  }

}
