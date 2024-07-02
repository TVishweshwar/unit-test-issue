import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterContentInit, Component, Input, OnDestroy } from '@angular/core';

interface ReactModule {
  bootstrap: (container: HTMLElement) => void;
  unmount?: (container: HTMLElement) => void;
}

@Component({
  selector: 'app-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.scss',
})
export class ReactWrapperComponent implements AfterContentInit, OnDestroy {
  @Input() remoteEntry: string = '';
  @Input() remoteName: string = '';
  @Input() exposedModule: string = '';

  private rootElement: HTMLElement | null = null;
  private reactModule: ReactModule | null = null;

  ngAfterContentInit() {
    this.loadRemoteModule();
  }

  private async loadRemoteModule() {
    if (!this.remoteEntry || !this.remoteName || !this.exposedModule) {
      console.error('remoteEntry, remoteName, or exposedModule is not defined');
      return;
    }

    try {
      this.reactModule = await loadRemoteModule({
        type: 'script',
        remoteEntry: this.remoteEntry,
        remoteName: this.remoteName,
        exposedModule: this.exposedModule,
      });

      this.rootElement = document.getElementById('root');
      if (this.rootElement && this.reactModule) {
        this.reactModule.bootstrap(this.rootElement);
      } else {
        console.error(
          'Root element with id "root" or reactModule is not available'
        );
      }
    } catch (error) {
      console.error('Error loading remote module', error);
    }
  }

  ngOnDestroy() {
    if (this.rootElement && this.reactModule?.unmount) {
      this.reactModule.unmount(this.rootElement);
    }
  }
}
