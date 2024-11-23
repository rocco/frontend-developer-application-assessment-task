import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userDocuments: any;

  constructor(
    private http: HttpClient
  ) {}

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

  private async fetchUserDocuments() {
    const allPatientsMenu:any = await firstValueFrom(this.http.get('/rest2/sdapi/0.1/objects/PP_ALL_PATIENTS'));
    const patientsListInvoker = allPatientsMenu['subMenus'][0]['invokers'][0];
    const patientsList:any = await firstValueFrom(this.http.put('/rest2/sdapi/0.1/invoke-method',patientsListInvoker));
    const currentPatient = patientsList['items'][0];
    const currentPatientId = currentPatient['attrValues'][13];

    const documentsMenu: any = await firstValueFrom(this.http.get('/rest2/sdapi/0.1/objects/PP_FIND_ALL_DOCUMENTS_FROM_PAT_W_ID'));

    const findInObjListInvoker = documentsMenu['subMenus'][0]['invokers'][0];
    const objectFinder: any = await firstValueFrom(this.http.put('/rest2/sdapi/0.1/invoke-method',findInObjListInvoker));

    const attributeValues = objectFinder['attributeValues'];
    for(const key in attributeValues) {
      attributeValues[key]['displayValue'] = `${currentPatientId}`;
      attributeValues[key]['internalValue'] = `${currentPatientId}`;
    }
    const invokerFromFinder = this.findValueInObject(objectFinder, "t", "StepInvoker" )
    invokerFromFinder['parameters'] = attributeValues;

    const objectId = findInObjListInvoker['objId'];
    const activityId = findInObjListInvoker['activityId'];
    const methodId = findInObjListInvoker['methodId'];
    const searchResult = await firstValueFrom(this.http.put(`/rest2/sdapi/0.1/${objectId}/${activityId}/${methodId}/step`,invokerFromFinder));
    console.log(`documentsList`, searchResult)
  }


  async ngOnInit() {
    this.userDocuments = this.fetchUserDocuments();
  }

  logout(){
    this.http.post('/auth-service/jslogout?application=p-p-dev&path=/',{}).subscribe();
    window.location.reload();
  }

}
