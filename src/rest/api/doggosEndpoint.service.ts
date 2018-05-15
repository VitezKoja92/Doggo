import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/count';

import { Doggo } from './../models/doggo';
import { GenderEnum } from '../enums/genderEnum';
import { Language } from './../models/language';

@Injectable()
export class DoggosEndpointService {

    protected DOGGOS_JSON_STRING = 'http://localhost:3000/doggos';

    constructor(private storage: Storage,
                private httpClient: HttpClient) {}

    getDoggos(): Observable<Doggo[]> {
       return this.httpClient.get<Doggo[]>(this.DOGGOS_JSON_STRING); 
    }; 

    getDoggosByGender(gender: string): Observable<Doggo[]>{
        return this.httpClient.get<Doggo[]>(`${this.DOGGOS_JSON_STRING}?generalInfo.gender=${gender}`);
    };

    getDoggoById(doggoId: string): Observable<Doggo> {
        return this.httpClient.get<Doggo>(`${this.DOGGOS_JSON_STRING}/${doggoId}`);
    }

    deleteDoggo(doggoId: string): Observable<string> {
        return this.httpClient.delete<string>(`${this.DOGGOS_JSON_STRING}/${doggoId}`);
    }
}
