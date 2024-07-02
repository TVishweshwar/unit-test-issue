import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { startsWith } from './services/routes/router.utils';
import { WrapperComponent } from './components/utility/wrapper/wrapper.component';
import { PageNotFoundComponent } from './components/utility/page-not-found/page-not-found.component';
import { authGuard } from './services/auths/auth.guard';
import { LoginComponent } from './components/common/login/login.component';
import { UserProfileComponent } from './components/common/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    data: { roles: ['admin', 'employee', 'Manager'] },
    canActivate: [authGuard],
  },
  {
    matcher: startsWith('mfe1'),
    component: WrapperComponent,
    data: {
      importName: 'mfe1',
      elementName: 'mfe1-element',
      roles: ['employee'],
    },
    canActivate: [authGuard],
  },
  {
    path: 'goals',
    component: UserProfileComponent,
    pathMatch: 'full',
    data: { roles: ['employee', 'Manager'] },
    canActivate: [authGuard],
  },

  { path: 'auth', component: LoginComponent, pathMatch: 'full' },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}