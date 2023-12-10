import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hcp-d-sidebar',
  templateUrl: './hcp-d-sidebar.component.html',
  styleUrls: ['./hcp-d-sidebar.component.css']
})
export class HcpDSidebarComponent {

  constructor(private router:Router){}

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
