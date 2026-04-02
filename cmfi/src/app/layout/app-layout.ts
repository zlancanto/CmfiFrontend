import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { APP_ROUTE_URLS } from '@core/routing/app-route.constants';

type SidebarItem = {
  label: string;
  icon: string;
  route: string;
  showChevron?: boolean;
};

type SidebarSection = {
  title: string;
  items: ReadonlyArray<SidebarItem>;
};

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss'
})
export class AppLayout {
  protected readonly pageTitle = 'E-Commerce Dashboard';

  protected readonly topbarIcons = ['pi pi-search', 'pi pi-bell', 'pi pi-comment', 'pi pi-palette'];

  protected readonly sections: ReadonlyArray<SidebarSection> = [
    {
      title: 'Dashboards',
      items: [{ label: 'E-Commerce', icon: 'pi pi-home', route: APP_ROUTE_URLS.dashboard }]
    },
    {
      title: 'Apps',
      items: [
        { label: 'CMS', icon: 'pi pi-comments', route: APP_ROUTE_URLS.cms, showChevron: true },
        { label: 'Chat', icon: 'pi pi-comment', route: APP_ROUTE_URLS.chat },
        { label: 'Files', icon: 'pi pi-folder', route: APP_ROUTE_URLS.files },
        { label: 'Mail', icon: 'pi pi-envelope', route: APP_ROUTE_URLS.mail },
        { label: 'Task List', icon: 'pi pi-check-square', route: APP_ROUTE_URLS.taskList }
      ]
    },
    {
      title: 'UI Kit',
      items: [
        { label: 'Form Layout', icon: 'pi pi-id-card', route: APP_ROUTE_URLS.formLayout },
        { label: 'Input', icon: 'pi pi-pen-to-square', route: APP_ROUTE_URLS.input },
        { label: 'Button', icon: 'pi pi-stop-circle', route: APP_ROUTE_URLS.button },
        { label: 'Table', icon: 'pi pi-table', route: APP_ROUTE_URLS.table }
      ]
    }
  ];

  protected readonly sidebarOpen = signal(false);
  protected readonly isDark = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;

  constructor() {
    const isDesktop = this.window?.matchMedia?.('(min-width: 1081px)').matches ?? true;
    this.sidebarOpen.set(isDesktop);

    const systemPrefersDark =
      this.window?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.isDark.set(systemPrefersDark);

    effect(() => {
      const darkEnabled = this.isDark();
      this.document.documentElement.classList.toggle('app-dark', darkEnabled);
    });
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  protected closeSidebar(): void {
    if (!this.isDesktopViewport()) {
      this.sidebarOpen.set(false);
    }
  }

  protected toggleTheme(): void {
    this.isDark.update((value) => !value);
  }

  private isDesktopViewport(): boolean {
    return (this.window?.innerWidth ?? 1920) > 1080;
  }
}
