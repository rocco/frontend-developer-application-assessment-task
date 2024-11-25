import { HttpClient } from '@angular/common/http';
import { Component, NgIterable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoadingController } from '@ionic/angular';

interface ObjClassIcon {
  t: string;
  label: string;
  tooltip: string;
  italic: boolean;
  uri: string;
  overlayUri: string;
}

interface ObjBehavior {
  t: string;
  objId: number;
  activityId: number;
  methodId: number;
  parentId: number;
  methodName: string;
  parameters: {},
  presentation: {
    t: string;
    label: string;
    tooltip: string;
    italic: boolean;
    uri: string;
    overlayUri: string;
  },
  shortcut: string;
  reference: string;
  target: string;
  tempParamkeyObjlistViewed: string;
  tempParamkeyObjlistSelected: string;
}

interface UserDocument {

  objId: number
  parentId: number;
  objName: string;
  objclass: {
    objclassId: number;
    type: string;
  };
  italic: boolean;
  type: string;
  sortLevel: number;
  classification: number;
  behaviors: ObjBehavior[];
  statusInfo: {
    label: string;
    color: string;
    tooltip: string;
    type: string;
  };
  objClassIcon: ObjClassIcon;
  attrValues: string[];
  onDoubleClick: any;
  onRightClick: any;
  onShortcut: any;
  onDragAndDrop: any;
  onRefreshObj: any;
  onPreview: any;
  tooltip: string;
  internalValue: string;
  displayValue: string;
  hasCheckbox: boolean;
  displayFormat: string;
}

interface DocumentList {
  items: UserDocument[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userDocuments: UserDocument[] = [];
  loading: HTMLIonLoadingElement | null = null;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {
  }

  private findValueInObject(obj: any, key: string, value: any) {
    if (obj[key] === value) {
      return obj;
    }
    for (const k in obj) {
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        const result: any = this.findValueInObject(obj[k], key, value);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  private async fetchUserDocuments(): Promise<UserDocument[]> {
    const allPatientsMenu: any = await firstValueFrom(this.http.get('/rest2/sdapi/0.1/objects/PP_ALL_PATIENTS'));
    const patientsListInvoker = allPatientsMenu['subMenus'][0]['invokers'][0];
    const patientsList: any = await firstValueFrom(this.http.put('/rest2/sdapi/0.1/invoke-method', patientsListInvoker));
    const currentPatient = patientsList['items'][0];
    const currentPatientId = currentPatient['attrValues'][13];

    const documentsMenu: any = await firstValueFrom(this.http.get('/rest2/sdapi/0.1/objects/PP_FIND_ALL_DOCUMENTS_FROM_PAT_W_ID'));

    const findInObjListInvoker = documentsMenu['subMenus'][0]['invokers'][0];
    const objectFinder: any = await firstValueFrom(this.http.put('/rest2/sdapi/0.1/invoke-method', findInObjListInvoker));

    const attributeValues = objectFinder['attributeValues'];
    for (const key in attributeValues) {
      attributeValues[key]['displayValue'] = `${currentPatientId}`;
      attributeValues[key]['internalValue'] = `${currentPatientId}`;
    }
    const invokerFromFinder = this.findValueInObject(objectFinder, "t", "StepInvoker");
    invokerFromFinder['parameters'] = attributeValues;

    const objectId = findInObjListInvoker['objId'];
    const activityId = findInObjListInvoker['activityId'];
    const methodId = findInObjListInvoker['methodId'];
    const searchResult = await firstValueFrom(this.http.put(`/rest2/sdapi/0.1/${objectId}/${activityId}/${methodId}/step`, invokerFromFinder)) as DocumentList;

    console.log(`documentsList`, searchResult);

    return searchResult.items;
  }

  /**
   * Set up initial loading indicator and load data
   */
  async ngOnInit() {
    // initial loading indicator
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 30000,
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
    this.userDocuments = await this.fetchUserDocuments();
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
