import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUsername = new BehaviorSubject<string>(localStorage.getItem('username') || '');

  constructor() {}
  
  getUsername(): string {
    return this.currentUsername.getValue();
  }

  getAuthState(): Observable<string> {
    return this.currentUsername.asObservable();
  }

  setUsername(username: string): void {
    this.currentUsername.next(username);
    localStorage.setItem('username', username);
  }

  clearUsername(): void {
    this.currentUsername.next('');
    localStorage.removeItem('username');
  }
} 