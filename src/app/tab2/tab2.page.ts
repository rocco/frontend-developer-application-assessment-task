import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private http: HttpClient
  ) {}

  logout(){
    this.http.post('/auth-service/jslogout?application=p-p-dev&path=/',{}).subscribe();
    window.location.reload();
  }

}
