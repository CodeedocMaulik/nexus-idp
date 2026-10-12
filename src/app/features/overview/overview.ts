import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export interface EphemeralEnv {
  id: string;
  name: string;
  service: string;
  branch: string;
  cluster: string;
  owner: string;
  status: 'Running' | 'Provisioning' | 'Expiring' | 'Failed';
  ttlHours: number;
  costPerHour: number;
}

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  // 1. Search filter signal
  searchQuery = signal<string>('');

  // 2. Metrics signals
  kpis = signal<MetricCard[]>([
    {
      id: 'kpi-1',
      label: 'Active Clusters',
      value: '14 / 14',
      change: '100% SLA',
      isPositive: true,
      icon: 'clusters',
    },
    {
      id: 'kpi-2',
      label: 'Running Ephemeral Envs',
      value: '26',
      change: '+6 today',
      isPositive: true,
      icon: 'envs',
    },
    {
      id: 'kpi-3',
      label: 'Monthly Cloud Spend',
      value: '$14,280',
      change: '-8.4% vs forecast',
      isPositive: true,
      icon: 'finops',
    },
    {
      id: 'kpi-4',
      label: 'Median Provision Time',
      value: '2.4 mins',
      change: '-45s faster',
      isPositive: true,
      icon: 'speed',
    },
  ]);

  // 3. Ephemeral Environments mock dataset
  environments = signal<EphemeralEnv[]>([
    {
      id: 'env-101',
      name: 'pr-452-checkout-v2',
      service: 'Payment Gateway',
      branch: 'feature/stripe-elements',
      cluster: 'k8s-us-east-dev',
      owner: 'sarah.dev',
      status: 'Running',
      ttlHours: 14,
      costPerHour: 0.42,
    },
    {
      id: 'env-102',
      name: 'pr-890-auth-saml',
      service: 'Identity Provider',
      branch: 'fix/okta-callback',
      cluster: 'k8s-eu-west-staging',
      owner: 'alex.ops',
      status: 'Expiring',
      ttlHours: 1.5,
      costPerHour: 0.68,
    },
    {
      id: 'env-103',
      name: 'pr-312-redis-cache-tier',
      service: 'Session Cache',
      branch: 'perf/cluster-sharding',
      cluster: 'k8s-us-west-dev',
      owner: 'maulik.patel',
      status: 'Running',
      ttlHours: 36,
      costPerHour: 1.15,
    },
    {
      id: 'env-104',
      name: 'pr-110-ai-rag-pipeline',
      service: 'Vector Search Agent',
      branch: 'feat/qdrant-integration',
      cluster: 'k8s-gpu-pool-1',
      owner: 'chen.ml',
      status: 'Provisioning',
      ttlHours: 48,
      costPerHour: 2.8,
    },
  ]);

  // 4. COMPUTED: Dynamic filtering based on search query
  filteredEnvironments = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.environments();
    return this.environments().filter(
      (env) =>
        env.name.toLowerCase().includes(q) ||
        env.service.toLowerCase().includes(q) ||
        env.branch.toLowerCase().includes(q) ||
        env.owner.toLowerCase().includes(q),
    );
  });

  // 5. COMPUTED: Total hourly cloud burn across running environments
  totalHourlyBurn = computed(() => {
    return this.environments()
      .filter((e) => e.status === 'Running' || e.status === 'Expiring')
      .reduce((acc, curr) => acc + curr.costPerHour, 0)
      .toFixed(2);
  });

  // 6. Action: Destroy an environment instantly using signal.update()
  destroyEnvironment(id: string): void {
    this.environments.update((envs) => envs.filter((e) => e.id !== id));
  }

  // 7. Action: Extend TTL by 24 hours
  extendTTL(id: string): void {
    this.environments.update((envs) =>
      envs.map((e) => (e.id === id ? { ...e, ttlHours: e.ttlHours + 24, status: 'Running' } : e)),
    );
  }

  // 8. Handle Search input
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
