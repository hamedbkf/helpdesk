import { Routes } from '@angular/router';

import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';

import { TicketList } from './pages/ticket-list/ticket-list';
import { TicketCreate } from './pages/ticket-create/ticket-create';
import { TicketDetails } from './pages/ticket-details/ticket-details';

import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
{
    path: 'login', component:Login,
    title: 'Log In | Helpdesk'
},
{
    path: 'register', component:Register,
    title: 'Sign Up | Helpdesk'
},

{
    path: 'tickets', component:TicketList,
    title: 'Tickets | Helpdesk'
},
{
    path: 'tickets/:id', component:TicketDetails,
    title: 'Ticket :id Details | Helpdesk'
},
{
    path: 'new-ticket', component:TicketCreate,
    title: 'New Ticket | Helpdesk'
},
{
    path: 'dashboard', component:Dashboard,
    title: 'Dashboard | Helpdesk'
},
{
    path: 'profile', component:Profile,
    title: 'Profile | Helpdesk'
}
];
