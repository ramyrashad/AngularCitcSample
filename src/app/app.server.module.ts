import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TransferState } from '@angular/platform-browser';
import { ServerService } from './common/server_service/server_service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers: [TransferState, ServerService],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
