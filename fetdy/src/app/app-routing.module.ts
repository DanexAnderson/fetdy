import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './post/create/create.component';
import { ListComponent } from './post/list/list.component';

const routes: Routes = [
  { path: '', component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:postId', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
