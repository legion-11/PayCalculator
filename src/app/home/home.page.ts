import { Component } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ishidden = true
  hoursWorked: string = "";
  hourlyRate: string = "";
  regularPay = 0.0
  overtimePay = 0.0
  totalPay = 0.0
  tax = 0.0

  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  // calculates payments and reveals card
  calculate = () => {
    let hours = Number(this.hoursWorked)
    let rate = Number(this.hourlyRate)

    if (hours === 0 || rate === 0) {return}

    if (hours  <= 40){
      this.regularPay = hours * rate
      this.overtimePay = 0
    } else {
      this.regularPay = 40 * rate
      this.overtimePay = (hours-40) * rate * 1.5
    }
    this.totalPay = this.overtimePay + this.regularPay
    this.tax = this.totalPay * 0.18
    this.ishidden = false
  }
}
