import { Component, EventEmitter, Output } from '@angular/core';
import { sideNavOptions } from './side-nav-options';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  collapsed = false;
  menuOptions = sideNavOptions;
  screenWidth = 0;


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
