import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { EditableSvgComponent } from '../../utility/editable-svg/editable-svg.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MaterialModule } from '../../../services/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WaffleMenuComponent } from './waffle-menu/waffle-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auths/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HoverDirective } from '../../../services/directives/hover.directive'; // Correct the path as necessary

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
      close: () => {},
    };
  }
}

export interface User {
  name: string;
  role: string;
}

class AuthServiceMock {
  getUser(): User | undefined {
    return { name: 'Test User', role: 'admin' };
  }
  logout() {}
}

class RouterMock {
  navigate() {}
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        EditableSvgComponent,
        NotificationsComponent,
        WaffleMenuComponent,
        HoverDirective, // Add HoverDirective here
      ],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open notifications drawer', () => {
    component.notificationComponent = jasmine.createSpyObj(
      'NotificationsComponent',
      ['openDrawer']
    );
    component.openNotificationsDrawer();
    expect(component.notificationComponent.openDrawer).toHaveBeenCalled();
  });

  it('should call authService logout on logout', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
