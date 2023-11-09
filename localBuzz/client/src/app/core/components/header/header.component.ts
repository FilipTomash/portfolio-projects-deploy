import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private appComponent = inject(AppComponent);

  currentUser$: User;
  isDropdownOpen: boolean = false;

  closeDropdown$ = this.appComponent.closeDropdown$;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((value) => {
      this.currentUser$ = value;
    });

    this.appComponent.closeDropdown$.subscribe({
      next: (value) => {
        this.isDropdownOpen = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeHeaderDropdown() {
    this.isDropdownOpen = false;
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLogoutAll() {
    this.authService.logoutAll();
  }
}
