import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auths/auth.service';
import { WaffleMenuComponent } from './waffle-menu/waffle-menu.component';
import {
  MenuArray,
  SharedService,
} from '../../../services/shared/shared.service';
import { MENU_DATA } from '../../../constants';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  private waffleMenuDialogRef:
    | MatDialogRef<WaffleMenuComponent>
    | null
    | undefined;
  @Input() sidenav!: MatSidenav;
  @ViewChild(MatSidenav) sidenote!: MatSidenav;
  @ViewChild(NotificationsComponent)
  notificationComponent!: NotificationsComponent;
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @Input() isCollapsed = false;
  @Input() isMobile = true;
  topItems = this.sharedService.topItems;
  hoveredIndex: number = -1;
  primaryColor: string = '';
  black: string = '';
  userName = this.authService.getUser()?.name;
  isNewNotif: boolean = true; //implement this flag when notifications are fetched from BE.
  isExpanded: boolean = false;
  isDrawerOpen: boolean = false;
  menuOptions = [
    {
      label: MENU_DATA.BOTTOM_ELEMENTS[0].label,
      svgName: MENU_DATA.BOTTOM_ELEMENTS[0].svgName,
      action: () => this.sharedService.routeScreen('profile'),
      isHovered: false,
      isClicked: false,
    },
    {
      label: MENU_DATA.BOTTOM_ELEMENTS[1].label,
      svgName: MENU_DATA.BOTTOM_ELEMENTS[1].svgName,
      action: () => this.sharedService.routeScreen('setting'),
      isHovered: false,
      isClicked: false,
    },
    {
      label: MENU_DATA.BOTTOM_ELEMENTS[2].label,
      svgName: MENU_DATA.BOTTOM_ELEMENTS[2].svgName,
      action: () => this.logout(),
      isHovered: false,
      isClicked: false,
    },
  ];

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.primaryColor = this.sharedService.getPrimaryColourInComponent();
    this.black = this.sharedService.getMajorColourInComponent();
  }

  resetStates() {
    this.menuOptions.forEach(option => {
      option.isHovered = false;
      option.isClicked = false;
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  openNotificationsDrawer() {
    this.notificationComponent.openDrawer();
  }

  openSearchDrawer() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      data: { name: 'vrushali' },
    });

    dialogRef.afterClosed().subscribe();
  }

  logout() {
    this.authService.logout();
  }

  openWaffleDialog(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    if (this.waffleMenuDialogRef) {
      this.waffleMenuDialogRef.close();
      this.waffleMenuDialogRef = null;
    } else {
      const dialogConfig = {
        hasBackdrop: false,
        width: '400px',
        height: '23%',
        position: { right: '0', top: '65px' },
      };
      this.waffleMenuDialogRef = this.dialog.open(
        WaffleMenuComponent,
        dialogConfig
      );
      this.waffleMenuDialogRef.afterClosed().subscribe(() => {
        this.waffleMenuDialogRef = null;
      });
    }
  }
  closeWaffleMenuDialog() {
    this.waffleMenuDialogRef?.close();
    this.isDrawerOpen = false;
  }
  toggleSearch() {
    this.isExpanded = !this.isExpanded;
  }
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleSearch();
    }
  }

  getIconPath(item: MenuArray): string {
    const basePath = 'assets/images/';
    let folder = '';
    if (this.isDrawerOpen && item.iconName == 'nine-dots') {
      folder = 'new_fill';
    } else {
      folder = item.isHovered ? 'new_fill' : 'new_linear';
    }
    return `${basePath}${folder}/${item.iconName}.svg`;
  }
}
