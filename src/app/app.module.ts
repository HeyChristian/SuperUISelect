import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CustomDropdownComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
