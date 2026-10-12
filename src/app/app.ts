import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // 1. A writable Signal (holding application state)
  appName = signal('Nexus Internal Developer Platform');
  version = signal('v1.0.0');

  // 2. A computed Signal (automatically recalculates when dependencies change)
  appTitle = computed(() => `${this.appName()} (${this.version()})`);

  // 3. A signal holding a mock list of platform services
  coreServices = signal([
    { id: 'srv-1', name: 'Kubernetes Cluster Provisioner', status: 'Active' },
    { id: 'srv-2', name: 'Database-as-a-Service (Postgres/Redis)', status: 'Active' },
    { id: 'srv-3', name: 'Ephemeral Preview Environments', status: 'Beta' },
    { id: 'srv-4', name: 'FinOps Cloud Cost Guard', status: 'Maintenance' },
  ]);
}
