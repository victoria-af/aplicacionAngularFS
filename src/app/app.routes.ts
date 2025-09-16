import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserDetail } from './pages/user-detail/user-detail';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home },
    { path: 'user/_id', component: UserDetail},
    { path: 'newuser', component: UserForm },
    { path: 'updateuser/:_id', component: UserForm }
];
