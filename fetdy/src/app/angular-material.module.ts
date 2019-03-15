import {
  MatInputModule, MatCardModule,
  MatButtonModule, MatPaginatorModule,
  MatIconModule, MatDialogModule
 } from '@angular/material';
import {
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatMenuModule
 } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({

/* imports: [
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule
], */
exports: [

  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatButtonModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule
]
})
export class AngularMaterialModule {

}
