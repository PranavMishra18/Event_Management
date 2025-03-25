import { Component, OnInit } from '@angular/core';
import { EventService } from '../../eventService';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../entities/event';
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
} from 'ng-apexcharts';

// Define different chart option types
export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels?: ApexDataLabels;
  legend?: ApexLegend;
};

export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
  dataLabels?: ApexDataLabels;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
};

@Component({
  selector: 'app-completed-event-analytics',
  templateUrl: './completed-event-analytics.component.html',
  styleUrls: ['./completed-event-analytics.component.css'],
})
export class CompletedEventAnalyticsComponent implements OnInit {
  event: Event;
  eventId: number;
  analytics: any;

  // Multiple chart options
  public pieChartOptions: Partial<PieChartOptions>;
  public lineChartOptions: Partial<LineChartOptions>;
  public radialChartOptions: Partial<RadialChartOptions>;
  public barChartOptions: Partial<BarChartOptions>;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.eventService.getEvent(this.eventId).subscribe((data) => {
      this.event = data;
      console.log(this.event);
    });

    // Dummy analytics data
    this.analytics = {
      totalRegistered: 150,
      totalAttended: 120,
      budget: 5000, // In dollars
      satisfactionScore: 87, // Percentage
      keyGuests: ['John Doe', 'Jane Smith', 'Alice Johnson'],
      socialMediaImpressions: 25000,
      durationHours: 4,
      surveyResponses: 100,
    };

    // 1) Pie Chart (Attendee Distribution)
    this.pieChartOptions = {
      series: [60, 25, 15],
      chart: {
        type: 'pie',
        height: 280,
      },
      labels: ['Students', 'Faculty', 'Guests'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 320 },
            legend: { position: 'bottom' },
          },
        },
      ],
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
    };

    // 2) Line Chart (Attendees Over Time - Dummy)
    this.lineChartOptions = {
      series: [
        {
          name: 'Attendees',
          data: [10, 35, 60, 90, 120, 115, 70], // example
        },
      ],
      chart: {
        type: 'line',
        height: 280,
      },
      xaxis: {
        categories: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
      },
      legend: { position: 'top' },
      dataLabels: { enabled: false },
    };

    // 3) Radial Chart (Satisfaction Score)
    this.radialChartOptions = {
      series: [this.analytics.satisfactionScore],
      chart: {
        height: 280,
        type: 'radialBar',
      },
      labels: ['Satisfaction'],
      plotOptions: {
        radialBar: {
          hollow: { size: '55%' },
          dataLabels: {
            name: {
              fontSize: '14px',
              color: '#666',
              offsetY: 60,
            },
            value: {
              fontSize: '24px',
              color: '#333',
              offsetY: 0,
            },
          },
        },
      },
    };

    // 4) Bar Chart (Registrations vs. Attended - Dummy)
    this.barChartOptions = {
      series: [
        {
          name: 'Registered',
          data: [40, 60, 45, 80, 50],
        },
        {
          name: 'Attended',
          data: [35, 55, 40, 70, 45],
        },
      ],
      chart: {
        type: 'bar',
        height: 280,
      },
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      },
      legend: { position: 'top' },
      dataLabels: { enabled: false },
    };
  }
}
