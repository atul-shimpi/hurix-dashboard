import { Component, OnInit } from '@angular/core';
import { BrowserMarketService } from './services/browser-market.service';

@Component({
  selector: 'hurix-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  series: any[];
  constructor(private browserMarketService: BrowserMarketService) { }

  ngOnInit(): void {
    this.browserMarketService.get().subscribe(res => this.series = res);
  }

}
