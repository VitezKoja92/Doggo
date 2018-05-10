import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Doggo } from './../models/doggo';

@Injectable()
export class DoggosEndpointService {
    constructor(
        public httpClient: HttpClient
    ) {}

    protected DOGGOS_JSON_STRING = 'http://localhost:3000/doggos';

    // getDoggos(): Observable<Doggo[]> {
    //     return this.httpClient.get(this.DOGGOS_JSON_STRING)
    //         .map(response => {
    //             return response.json
    //         });
    // }; 
}
