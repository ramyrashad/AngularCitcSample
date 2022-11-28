import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UrlSerializer } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TransferHttpCacheModule } from '@nguniversal/common';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AngularFireAuthModule,
    TransferHttpCacheModule
  ],
  providers: [
    TranslateService,
    DatePipe,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
