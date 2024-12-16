import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface InventoryItem {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) { }

  createItem(formData: FormData): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, formData);
  }

  getItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl).pipe(
      map(items => items.map(item => ({
        ...item,
        // Ensure imageUrl is a full URL
        imageUrl: item.imageUrl.startsWith('http') 
          ? item.imageUrl 
          : `${environment.apiUrl}/${item.imageUrl}`
      })))
    );
  }

  uploadImage(file: File): FormData {
    const formData = new FormData();
    formData.append('image', file);
    return formData;
  }
} 