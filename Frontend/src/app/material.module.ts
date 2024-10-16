import { NgModule } from "@angular/core";

import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";




@NgModule({


    imports :[MatButtonModule,MatIconButton,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,
        BrowserAnimationsModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,MatTableModule,MatTooltipModule,MatDialogModule,
      MatProgressBarModule,MatProgressSpinnerModule],
    exports : [MatButtonModule,MatIconButton,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,
        BrowserAnimationsModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,MatTableModule,MatTooltipModule,MatDialogModule,
      MatProgressBarModule,MatProgressSpinnerModule],
  
})
export class MaterialModule{
    
}