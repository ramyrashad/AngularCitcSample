import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClient) { }

  getAlltutorialVideos(model) {
    return this.http.post("TutorialVideos/Search", model).pipe();
  }
}
