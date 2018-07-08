import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  imports: [MatButtonModule,MatToolbarModule,MatFormFieldModule,MatInputModule,MatChipsModule],
  exports: [MatButtonModule,MatToolbarModule,MatFormFieldModule,MatInputModule,MatChipsModule],
})
export class MaterialModule { }