import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MenuArray,
  SharedService,
} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-waffle-menu',
  templateUrl: './waffle-menu.component.html',
  styleUrl: './waffle-menu.component.scss',
})
export class WaffleMenuComponent implements OnInit {
  tiles = this.sharedService.sideNavItems;
  hoveredIndex: number = -1;
  primaryColor: string = '';
  black: string = '';

  constructor(
    private dialogRef: MatDialogRef<WaffleMenuComponent>,
    public sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.primaryColor = this.sharedService.getPrimaryColourInComponent();
    this.black = this.sharedService.getMajorColourInComponent();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getIconPath(item: MenuArray): string {
    const basePath = 'assets/images/';
    const folder =
      item.isHovered || this.sharedService.isActive(item.routerLink)
        ? 'new_fill'
        : 'new_linear';
    return `${basePath}${folder}/${item.iconName}.svg`;
  }
}
