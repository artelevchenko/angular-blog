import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text!: string;
  public type = 'success'

  alertSub!: Subscription

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeOut = setTimeout(() => {
        clearTimeout(timeOut)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}
