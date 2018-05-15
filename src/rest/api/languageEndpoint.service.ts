import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Language } from './../models/language';

@Injectable()
export class LanguageEndpointService {

    protected LANGUAGES_JSON_STRING = "http://localhost:3000/languages";

    constructor(private httpClient: HttpClient){}

    getLanguages(): Observable<Language[]> {
        return this.httpClient.get<Language[]>(this.LANGUAGES_JSON_STRING);
    }
}
