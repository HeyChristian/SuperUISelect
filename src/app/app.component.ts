import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  items = [
    {
      name: '1234',
      make: 'toyota'
    },
    {
      name: '5678',
      make: 'hyundai'
    },
     {
      name: 'A343BB',
      make: 'toyota'
    },
  ];

   selection = {
      name: '5678',
      make: 'hyundai'
    };
  
}
