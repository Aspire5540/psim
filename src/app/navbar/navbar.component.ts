import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  message:string;


  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    console.log(this.sidebarOpened);
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(private configService :ConfigService,config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
    this.configService.currentMessage.subscribe(message => this.message = message)
    //console.log(this.message);
  }

}
