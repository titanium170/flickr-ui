import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FlickrPhoto } from 'src/app/models';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {

  @Input() photo!: FlickrPhoto;

  constructor() { }

  ngOnInit(): void {
  }

  openLink() {
    window.open(this.photo.link, '_blank');
  }

}
