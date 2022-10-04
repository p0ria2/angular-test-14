import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  ticks = 300;
  timer$ = new BehaviorSubject(0);
  enabled$ = new BehaviorSubject(false);

  ngOnInit() {
    this.enabled$
      .pipe(
        switchMap((enabled) =>
          enabled
            ? interval(this.ticks).pipe(map((_) => this.timer$.value + 1))
            : EMPTY
        )
      )
      .subscribe((timer) => this.timer$.next(timer));
  }

  toggleTimer() {
    this.enabled$.next(!this.enabled$.value);
  }

  resetTimer() {
    this.timer$.next(0);
  }
}
