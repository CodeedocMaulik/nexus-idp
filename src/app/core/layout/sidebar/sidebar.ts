import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Desktop collapsed rail state
  isCollapsed = input<boolean>(false);
  // Mobile drawer open state
  isMobileOpen = input<boolean>(false);

  toggleCollapse = output<void>();
  closeMobile = output<void>();

  navItems: NavItem[] = [
    { label: 'Overview', route: '/overview', icon: 'overview' },
    { label: 'Environments', route: '/environments', icon: 'environments', badge: 'Live' },
    { label: 'Service Catalog', route: '/catalog', icon: 'catalog' },
    { label: 'FinOps Costs', route: '/finops', icon: 'finops' },
    { label: 'Audit Logs', route: '/audit', icon: 'audit' },
  ];
}
