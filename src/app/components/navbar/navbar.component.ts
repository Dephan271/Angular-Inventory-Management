import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');
    </style>
    <nav class="bg-gradient-to-t from-green-800 to-green-600 shadow-lg" style="font-family: 'Outfit', sans-serif;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img src="logo.png" class="h-10 drop-shadow-md" alt="icon">
              <a routerLink="/inventory" class="text-white text-xl font-bold ml-2 hover:text-green-100 transition-colors duration-200">Inventory Management</a>
            </div>
          </div>
          <div class="flex items-center">
            @if (authService.isAuthenticated) {
              <button
                href="/inventory"
                (click)="onLogout()"
                class="text-white hover:bg-green-700 hover:shadow-md px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Logout
              </button>
            } @else {}
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
