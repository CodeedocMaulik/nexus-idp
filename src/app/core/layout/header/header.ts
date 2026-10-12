import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Inputs & Outputs
  isSidebarCollapsed = input<boolean>(false);
  toggleSidebar = output<void>();

  // Mock enterprise environment context & user state
  activeRegion = signal('aws-eu-west-1');
  clusterStatus = signal('Healthy (99.98% SLA)');
  currentUser = signal({
    name: 'Maulik Patel',
    role: 'Lead Platform Engineer',
    avatar: 'MP',
  });
}
