import { Component } from '@angular/core';

@Component({
  selector: 'pli-home',
  imports: [],
  template: `
    <p>
      home works!
      <a href="/api/user/logout">Logout</a>
    </p>
  `,
  styles: ``
})
export class HomeComponent {

}
