import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';

const routes: Routes = [
  { path: '', redirectTo: '/colors', pathMatch: 'full' },
  { path: 'colors', component: ColorsComponent },
  { path: '**', redirectTo: '/colors' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
