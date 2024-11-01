import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private http: HttpClient
  ) {}

  logout(){
    this.http.post('/auth-service/jslogout?application=p-p-dev&path=/',{}).subscribe();
    window.location.reload();
  }

}
