import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DoggosEndpointService } from './doggosEndpoint.service';
import { LanguageEndpointService } from './languageEndpoint.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    exports: [],
    providers: [
        DoggosEndpointService,
        LanguageEndpointService
    ]
})

export class RestApiModule {}
