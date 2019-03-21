import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FitnessWelcomeComponent } from '../dashboards/fitness-welcome/fitness-welcome.component';
import { TrainingComponent } from '../training/training.component';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { CurrentTrainingComponent } from '../training/current-training/current-training.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingComponent } from '../training/past-training/past-training.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [

   { path: '', redirectTo: '/fitness/fitness', pathMatch: 'full' },
   { path: '', component: SidenavComponent ,
   children: [ { path: 'fitness', component: FitnessWelcomeComponent },
                { path: 'training', component: TrainingComponent },
              ] },

];

@NgModule({
  declarations:
  [
    FitnessWelcomeComponent,
    TrainingComponent,
    SidenavComponent,
    HeaderComponent,
    SidenavListComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
  ],
  imports: [
    CommonModule, FormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SidenavRoutingModule {

}
