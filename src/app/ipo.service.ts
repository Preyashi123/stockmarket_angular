import { Ipo } from './ipo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpoService {

  private ipoUrl: string;
  private addIpoUrl: string;
  private deleteIpoUrl: string;
  private oneIpoUrl: String;
  private ipo : Ipo;

  constructor(private http: HttpClient) { 
    this.ipoUrl = 'http://localhost:3002/company/ipo';
    this.addIpoUrl='http://localhost:3002/company/ipo/addipo';
    this.deleteIpoUrl='http://localhost:3002/company/ipo/deleteipo';
    this.oneIpoUrl ='/company/ipo';

  }

  public findAll(): Observable<Ipo[]> {
    return this.http.get<Ipo[]>(this.ipoUrl);
  }
  public save(ipo: Ipo) {
    return this.http.post<Ipo>(this.addIpoUrl, ipo);
  }

  deleteIpo(id: number): Observable<any> {
    return this.http.get(`${this.deleteIpoUrl}/${id}`, { responseType: 'text' });
    console.log(id);
  }
  getOneipo(id: number): Observable<any> {
    return this.http.get(`${this.oneIpoUrl}/${{id}}`);

  }


}
