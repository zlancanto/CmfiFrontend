import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
      items: [{ label: 'E-Commerce', icon: 'pi pi-home', route: '/dashboard' }]
    },
    {
      title: 'Apps',
      items: [
        { label: 'CMS', icon: 'pi pi-comments', route: '/cms', showChevron: true },
        { label: 'Chat', icon: 'pi pi-comment', route: '/chat' },
        { label: 'Files', icon: 'pi pi-folder', route: '/files' },
        { label: 'Mail', icon: 'pi pi-envelope', route: '/mail' },
        { label: 'Task List', icon: 'pi pi-check-square', route: '/task-list' }
      ]
    },
    {
      title: 'UI Kit',
      items: [
        { label: 'Form Layout', icon: 'pi pi-id-card', route: '/form-layout' },
        { label: 'Input', icon: 'pi pi-pen-to-square', route: '/input' },
        { label: 'Button', icon: 'pi pi-stop-circle', route: '/button' },
        { label: 'Table', icon: 'pi pi-table', route: '/table' }
      ]
    }
  ];

  protected readonly sidebarOpen = signal(false);
  protected readonly isDark = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly themeStorageKey = 'cmfi.theme';

  constructor() {
    const storedTheme = this.window?.localStorage.getItem(this.themeStorageKey);
    const prefersDark =
      this.window?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

    this.isDark.set(storedTheme ? storedTheme === 'dark' : prefersDark);

    effect(() => {
      const darkEnabled = this.isDark();
      this.document.documentElement.classList.toggle('app-dark', darkEnabled);
      this.window?.localStorage.setItem(
        this.themeStorageKey,
        darkEnabled ? 'dark' : 'light'
      );
    });
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((value) => !value);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected toggleTheme(): void {
    this.isDark.update((value) => !value);
  }
}
