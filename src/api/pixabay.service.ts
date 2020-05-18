import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface PixabayHit {
    id: number,
    pageURL: string,
    type: string,
    tags: string,
    previewURL: string
    previewWidth: number,
    previewHeight: number,
    webformatURL: string,
    webformatWidth: number,
    webformatHeight: number,
    largeImageURL: string,
    fullHDURL: string,
    imageURL: string,
    imageWidth: number,
    imageHeight: number,
    imageSize: number,
    views: number,
    downloads: number,
    favorites: number,
    likes: number,
    comments: number,
    user_id: number,
    user: string,
    userImageURL: string,
}

interface PixabayApiResponse {
  total: number,
  totalHits: number,
  hits: PixabayHit[]
}

@Injectable({
  providedIn: 'root'
})
export class PixabayService {

  constructor(private http: HttpClient) { }

  randomOne(theme: string, next: (pixImg: PixabayHit) => void) {
    let search = theme.replace('', '+');
    this.http.get(`https://pixabay.com/api/?key=${environment.pixabayConfig.key}&q=${search}&image_type=photo`).subscribe((data: PixabayApiResponse) => {
      let randomIndex = Math.floor(Math.random() * Math.floor(data.hits.length));
      next(data.hits[randomIndex]);
    });
  }
}
