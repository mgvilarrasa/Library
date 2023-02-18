import { Component } from '@angular/core';
import { sideNavOptions } from '../side-menu/side-menu-options';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  menuOptions = sideNavOptions;

}
