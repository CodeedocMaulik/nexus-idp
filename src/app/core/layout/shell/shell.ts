import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  // Desktop rail collapse state
  isDesktopCollapsed = signal<boolean>(false);

  // Mobile drawer open state
  isMobileOpen = signal<boolean>(false);

  toggleDesktop(): void {
    this.isDesktopCollapsed.update((v) => !v);
  }

  toggleMobile(): void {
    this.isMobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
  }
}
