import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { values } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class BrowserMarketService {

  constructor() { }

  get(): Observable<any> {
    return from(fetch("assets/browser-market.json").then(this.onFetchOK, this.onFetchFailed));
  }

  async onFetchOK(res) {
    const browserData = JSON.parse(JSON.stringify(await res.json()));
    const entities_names = Object.keys(browserData[0]).filter(key__ => key__ !== 'Date');

    const series = entities_names.map(entity_name__ => {
      return {
        name: entity_name__,
        values: browserData.map(browserData__ => ({ time: +browserData__.Date, value: browserData__[entity_name__]}))
      }
    });

    return series;
  }

  onFetchFailed(err) {
    alert(`Error while fetching browwer data ${err}`);
  }
}