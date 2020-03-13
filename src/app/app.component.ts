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
    }
  ];

  contact = [
    {
      name: 'Donald Trump',
      image: 'https://cdn.dribbble.com/users/1210339/screenshots/2909973/trump2_dribbble.jpg'
    },
    {
      name: 'Osama bin Laden',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS32642KhK8QLpgqxdSqxyHGUb5SUVpW9ZkfP6aXiKHrp_bSdxQ'
    },
    {
      name: 'Kim Jong Un',
      image: 'https://lh3.googleusercontent.com/proxy/CRVX1EGfQFayef3XiqBK9HmQCSYk0K6ejIrMaNMOHyj6KD10FnHR9jiz3_uNxjv4l2tEQmvZbF_1cDX2IUH4T5h5MGVhAjWoX17tUMI8KpI-8MGO1z5fQO-8bnM'
    },
  ];
  selection : any;
  //  selection = {
  //     name: '5678',
  //     make: 'hyundai'
  //   };
  
}
