import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { ContactComponent } from './pages/contac';
import { AnalyzeComponent } from './pages/analyze';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'analyze', component: AnalyzeComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404 pages
];
