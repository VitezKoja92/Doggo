import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DoggosEndpointService } from './doggosEndpoint.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    exports: [],
    providers: [
        DoggosEndpointService
    ]
})

export class RestApiModule {}
