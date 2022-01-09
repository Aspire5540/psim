import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import {SumtableComponent} from './sumtable/sumtable.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard'
import {UploadComponent} from'./upload/upload.component';
import {JobapproveComponent} from './jobapprove/jobapprove.component';
import {LVProComponent} from'./lvpro/lvpro.component';
import {PsimdashboardComponent} from './psimdashboard/psimdashboard.component';
import {PhasechkComponent} from './phasechk/phasechk.component';
import {RoicComponent} from './roic/roic.component';
import {EzxComponent} from './ezx/ezx.component';
import {RedirectComponent} from './redirect/redirect.component';
//,canActivate:[AuthGuard]
const routes: Routes = [
  { path: '', redirectTo: '/redict', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'jobreq', component: SumtableComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'jobapprove', component: JobapproveComponent,canActivate:[AuthGuard] },
  { path: 'ldcad', component: LVProComponent,canActivate:[AuthGuard]},
  { path: 'psim', component: PsimdashboardComponent,canActivate:[AuthGuard] },
  { path: 'phasecheck', component: PhasechkComponent,canActivate:[AuthGuard] },
  { path: 'roic', component: RoicComponent,canActivate:[AuthGuard] },
  { path: 'ezx', component: EzxComponent,canActivate:[AuthGuard] },
  { path: 'redict', component: RedirectComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
