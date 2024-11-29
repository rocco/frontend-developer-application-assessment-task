import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DocumentList, UserDocument } from './documents.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private http = inject(HttpClient);

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

  async fetchUserDocuments(): Promise<UserDocument[]> {
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
}
