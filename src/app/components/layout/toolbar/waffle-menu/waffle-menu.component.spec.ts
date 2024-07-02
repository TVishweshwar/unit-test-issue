import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaffleMenuComponent } from './waffle-menu.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SharedService,
  MenuArray,
} from '../../../../services/shared/shared.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { HoverDirective } from '../../../../services/directives/hover.directive';

class MockMatDialogRef {
  close() {}
}

class MockSharedService {
  sideNavItems: MenuArray[] = [];
  getPrimaryColourInComponent() {
    return 'mockPrimaryColor';
  }
  getMajorColourInComponent() {
    return 'mockBlack';
  }
}

describe('WaffleMenuComponent', () => {
  let component: WaffleMenuComponent;
  let fixture: ComponentFixture<WaffleMenuComponent>;
  let dialogRef: MockMatDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaffleMenuComponent, HoverDirective],
      imports: [MatGridListModule],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: SharedService, useClass: MockSharedService },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // You can use an empty object or a mock value if needed
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WaffleMenuComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tiles from sharedService', () => {
    expect(component.tiles).toEqual([]);
  });

  it('should initialize primaryColor and black on ngOnInit', () => {
    component.ngOnInit();
    expect(component.primaryColor).toBe('mockPrimaryColor');
    expect(component.black).toBe('mockBlack');
  });

  it('should call dialogRef.close when closeDialog is called', () => {
    spyOn(dialogRef, 'close');
    component.closeDialog();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
