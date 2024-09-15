import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const API_KEY = "4Bsh7zgELYc7HG1h0S1rn9T4EXpBVe1m";

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] = [];
  public gifList: Gif[] = [];
  private serviceUrl: string = "https://api.giphy.com/v1/gifs";

  constructor(private httpClient: HttpClient) {
    this.loadStorage();

  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private orginizeTags(tag: string){
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag)=> oldTag !== tag );
    }

    this._tagHistory.unshift(tag);
    this._tagHistory =  this._tagHistory.slice(0,10);
    this.saveStorage();
  }

  private saveStorage(): void {
    localStorage.setItem('history',JSON.stringify(this._tagHistory));
  }

  private loadStorage(): void {
    const data = localStorage.getItem('history');
    if ( data ){
      this._tagHistory = JSON.parse( data );
      if ( this._tagHistory.length > 0 ){
        this.searchTag(this._tagHistory[0]);
      }
    }
  }

  searchTag(tag: string): void {
    if (tag.length === 0 ) return;
    this.orginizeTags(tag);

    const params = new HttpParams()
        .set('api_key',API_KEY)
        .set('q',tag)
        .set('limit',10);


    this.httpClient.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
        .subscribe( resp => {

          this.gifList = resp.data;

          console.log({Gifs: this.gifList});
        });
    /*
    fetch("https://api.giphy.com/v1/gifs/search?api_key=4Bsh7zgELYc7HG1h0S1rn9T4EXpBVe1m&q=goku&limit=10")
        .then( resp => resp.json())
        .then( data => console.log(data) );
*/
  }
}
