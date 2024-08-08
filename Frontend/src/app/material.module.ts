import { NgModule } from "@angular/core";

import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";



// Define custom date formats
export const CUSTOM_DATE_FORMATS = {
    parse: {
      dateInput: 'DD-MM-YYYY', // Change the parse format to dd/mm/yyyy
    },
    display: {
      dateInput: 'MMM DD, YYYY', // Change the display format to dd/mm/yyyy
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
@NgModule({


    imports :[MatButtonModule,MatIconButton,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,
        BrowserAnimationsModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,MatTableModule,MatTooltipModule,MatDialogModule],
    exports : [MatButtonModule,MatIconButton,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,
        BrowserAnimationsModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,MatTableModule,MatTooltipModule,MatDialogModule],
    providers: [
        // Provide the custom date formats
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
      ]


})
export class MaterialModule{
    
}