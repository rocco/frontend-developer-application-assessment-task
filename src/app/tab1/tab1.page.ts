import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserDocument } from '../services/documents.interfaces';
import { inject } from '@angular/core';
import { DocumentsService } from '../services/documents.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userDocuments: UserDocument[] = [];
  loading: HTMLIonLoadingElement | null = null;

  private http = inject(HttpClient);
  private loadingCtrl = inject(LoadingController);
  private documentsService = inject(DocumentsService);


  /**
   * Set up initial loading indicator and load data
   */
  async ngOnInit() {
    // initial loading indicator
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 10000,
    });

    // load initial data
    await this.loading.present();
    await this.loadData();
    await this.loading.dismiss();
  }

  /**
   * Load data from server, triggered by pull-to-refresh
   * @param event optional event
   */
  async loadData(event?: any) {
    this.userDocuments = await this.documentsService.fetchUserDocuments();
    // tell refresher to hide
    event?.target.complete();
  }

  /**
   * Logout user
   */
  logout() {
    this.http.post('/auth-service/jslogout?application=p-p-dev&path=/', {}).subscribe();
    window.location.reload();
  }

}
