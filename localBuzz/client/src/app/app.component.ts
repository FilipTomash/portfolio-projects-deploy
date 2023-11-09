import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, HeaderComponent, SpinnerComponent],
})
export class AppComponent {
  closeDropdown$ = new BehaviorSubject<boolean>(null);
  title = 'localBuzz';

  onClickElsewhere() {
    this.closeDropdown$.next(false);
  }
}
