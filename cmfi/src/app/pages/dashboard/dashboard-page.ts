import { Component } from '@angular/core';

type Metric = {
  label: string;
  delta: string;
  value: string;
  tone: 'danger' | 'success' | 'info';
  trendIcon: string;
};

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  protected readonly metrics: ReadonlyArray<Metric> = [
    {
      label: 'Conversion Rate',
      delta: '0,6%',
      value: '0.81%',
      tone: 'danger',
      trendIcon: 'pi-arrow-down'
    },
    {
      label: 'Avg. Order Value',
      delta: '4,2%',
      value: '$306.2',
      tone: 'success',
      trendIcon: 'pi-arrow-up'
    },
    {
      label: 'Order Quantity',
      delta: '2,1%',
      value: '1,620',
      tone: 'info',
      trendIcon: 'pi-minus'
    }
  ];
}
