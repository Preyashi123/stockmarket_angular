import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { ManagecompanyComponent } from './managecompany/managecompany.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageexchangeComponent } from './manageexchange/manageexchange.component';
import { ImportdataComponent } from './importdata/importdata.component';
import { ManagesectorComponent } from './managesector/managesector.component';
import { UpdateipoComponent } from './updateipo/updateipo.component';
import { FooterComponent } from './footer/footer.component';
import { SummaryofuploadComponent } from './summaryofupload/summaryofupload.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { EditcompanyComponent } from './editcompany/editcompany.component';
import { AddexchangeComponent } from './addexchange/addexchange.component';
import { AddipoComponent } from './addipo/addipo.component';
import { EditipoComponent } from './editipo/editipo.component';
import { IposuserComponent } from './iposuser/iposuser.component';
import { ComparecompanyComponent } from './comparecompany/comparecompany.component';
import { ComparesectorComponent } from './comparesector/comparesector.component';
import { RendermapComponent } from './rendermap/rendermap.component';
import { OtheruserComponent } from './otheruser/otheruser.component';
import { UserlandingComponent } from './userlanding/userlanding.component';
import { AdminlandingComponent } from './adminlanding/adminlanding.component';
import { PreloginheaderComponent } from './preloginheader/preloginheader.component';
import { IpoService } from './ipo.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminheaderComponent,
    UserheaderComponent,
    ManagecompanyComponent,
    LogoutComponent,
    ManageexchangeComponent,
    ImportdataComponent,
    ManagesectorComponent,
    UpdateipoComponent,
    FooterComponent,
    SummaryofuploadComponent,
    AddcompanyComponent,
    EditcompanyComponent,
    AddexchangeComponent,
    AddipoComponent,
    EditipoComponent,
    IposuserComponent,
    ComparecompanyComponent,
    ComparesectorComponent,
    RendermapComponent,
    OtheruserComponent,
    UserlandingComponent,
    AdminlandingComponent,
    PreloginheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [IpoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
