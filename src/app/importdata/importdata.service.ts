import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType,HttpResponse  } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImportdataService {



  private baseUrl = 'http://localhost:3003';

  constructor(private http: HttpClient) { }

          upload(file: File): Observable<HttpEvent<any>> {
            //upload(file: File): Observable<number> {
            const formData: FormData = new FormData();

            formData.append('file', file);

            const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
              reportProgress: true,
              responseType: 'json'
            });

            // Use a subject to keep track of the status
            const progress = new BehaviorSubject<number>(0);

            // Send the request to the server and subscribe for updates
            this.http.request(req).subscribe(
              event => {
                if (event.type === HttpEventType.UploadProgress) {
                  // Report progress
                  progress.next(Math.round(100 * event.loaded / event.total));
                } else if (event instanceof HttpResponse) {
                  // Report progress and complete the Observable
                  progress.next(100);
                  progress.complete();
                }
              }
            );

            //return progress.asObservable();


            return this.http.request(req);
            }




          getFiles(): Observable<any> {
            return this.http.get(`${this.baseUrl}/files`);
          }

  
}
