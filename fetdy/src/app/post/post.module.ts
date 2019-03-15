import { NgModule } from '@angular/core';
import { CreateComponent } from '../post/create/create.component';

import { ListComponent } from '../post/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:
  [CreateComponent, ListComponent],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    CommonModule,  // to get NgIf
    RouterModule    // to get RouterLink
    ]
})
export class PostsModule {

}
