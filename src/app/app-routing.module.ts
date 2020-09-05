import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {SignupComponent} from '../app/signup/signup.component';
import {ManagecompanyComponent} from '../app/managecompany/managecompany.component';
import {LogoutComponent} from '../app/logout/logout.component';
import {SummaryofuploadComponent} from '../app/summaryofupload/summaryofupload.component';
import {UpdateipoComponent} from '../app/updateipo/updateipo.component';
import {ManageexchangeComponent} from '../app/manageexchange/manageexchange.component';
import { ImportdataComponent } from './importdata/importdata.component';
import {AddcompanyComponent} from '../app/addcompany/addcompany.component';
import {EditcompanyComponent} from '../app/editcompany/editcompany.component';
import {AddexchangeComponent} from '../app/addexchange/addexchange.component';
import {AddipoComponent} from '../app/addipo/addipo.component';
import {EditipoComponent} from '../app/editipo/editipo.component';
import {IposuserComponent} from '../app/iposuser/iposuser.component';
import {ComparecompanyComponent} from '../app/comparecompany/comparecompany.component';
import {ComparesectorComponent} from '../app/comparesector/comparesector.component';
import {OtheruserComponent} from '../app/otheruser/otheruser.component';
import {UserlandingComponent} from '../app/userlanding/userlanding.component';
import {AdminlandingComponent} from '../app/adminlanding/adminlanding.component';
import {RendermapComponent} from '../app/rendermap/rendermap.component';


const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
},
{
  path: 'userlanding',
  component: UserlandingComponent,

},
{
  path: 'adminlanding',
  component: AdminlandingComponent,

},
{
  path: 'logout',
  component: LogoutComponent,
},
{
path:'importdata',
component:ImportdataComponent,
},
{
  path: 'managecompany',
  component: ManagecompanyComponent,
},
{
  path: 'manageexchange',
  component: ManageexchangeComponent,
},
{
  path: 'summaryofupload',
  component: SummaryofuploadComponent,
},
{
  path: 'addcompany',
  component: AddcompanyComponent,
},
{
  path: 'editcompany',
  component: EditcompanyComponent,
},
{
  path: 'addexchange',
  component: AddexchangeComponent,
},
{
  path: 'updateipo',
  component: UpdateipoComponent,
},
{
  path: 'addipo',
  component: AddipoComponent,
},
{
  path: 'editipo',
  component: EditipoComponent,
},
{
  path: 'iposuser',
  component: IposuserComponent,
},
{
  path: 'comparecompany',
  component: ComparecompanyComponent,
},
{
  path: 'comparesector',
  component: ComparesectorComponent,
},
{
  path: 'otheruser',
  component: OtheruserComponent,
},
{
  path: 'rendermap',
  component: RendermapComponent,
},
{ path: 'ipoList', 
component : UpdateipoComponent
},
  { path: 'ipo', 
  component : AddipoComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

