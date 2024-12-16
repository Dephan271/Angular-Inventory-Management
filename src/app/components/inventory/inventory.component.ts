import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../services/inventory.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  template: `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&family=Outfit:wght@300&display=swap');
    </style>
    
    <section class="px-4 py-24 mx-auto max-w-10xl" style="background-color: #e5f5e0; font-family: 'Outfit', sans-serif;">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold mr-3">
            {{ username.charAt(0).toUpperCase() }}
          </div>
          <div>
            <p class="text-gray-700">Hello,</p>
            <p class="font-semibold text-gray-900">{{ username }}!</p>
          </div>
        </div>
      </div>
      <h2 class="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
        Inventory Management
      </h2>
      <button (click)="openModal()" class="btn bg-green-500 hover:bg-green-600 text-white float-right">Add Item</button>
      <p class="mb-20 text-lg text-gray-500">
        An inventory management system tracks all incoming inventory items.
      </p>

      <div class="flex justify-center mb-8">
        <div class="flex w-full max-w-md">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (keyup.enter)="searchItems()"
            placeholder="Search inventory..."
            class="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-green-500"
          />
          <button
            (click)="searchItems()"
            class="px-6 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      >
        <div *ngFor="let item of inventoryItems; let i = index" class="relative">
          <button 
            (click)="removeItem(i)" 
            class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 z-10"
          >
            ×
          </button>

          <a href="#">
            <img
              [src]="item.imageUrl"
              class="object-cover w-full h-56 mb-5 bg-center rounded"
              [alt]="item.name"
              loading="lazy"
            />
          </a>
          <h2 class="mb-2 text-lg font-semibold text-gray-900">
            <a href="#" class="text-gray-900 hover:text-purple-700">
              {{item.name}}
            </a>
          </h2>
          <p class="mb-3 text-sm font-normal text-gray-500">
            {{item.description}}
          </p>
          <p class="mb-3 text-sm font-normal text-gray-500">
            <a href="#" class="font-medium text-gray-900 hover:text-purple-700">
              Added by Admin
            </a>
            • {{item.createdAt | date}}
          </p>
        </div>
      </div>
      <!-- <div
        class="flex flex-col items-center justify-center mt-20 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row"
      >
        <a href="#" class="w-full rounded-full btn btn-light btn-xl md:w-auto"
          >Previous Page</a
        >
        <a href="#" class="w-full rounded-full btn btn-light btn-xl md:w-auto"
          >Next Page</a
        >
      </div> -->
    </section>

    <div *ngIf="isModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input 
              type="text" 
              [(ngModel)]="newItem.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea 
              [(ngModel)]="newItem.description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Item Image</label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event)"
            >
              <input
                type="file"
                #fileInput
                (change)="onFileSelected($event)"
                style="display: none"
                accept="image/*"
              >
              <div *ngIf="!newItem.imageUrl" class="space-y-2">
                <p class="text-gray-500">Drag and drop an image or</p>
                <button 
                  (click)="fileInput.click()"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Upload Image
                </button>
              </div>
              <img *ngIf="newItem.imageUrl" [src]="newItem.imageUrl" class="max-h-32 mx-auto">
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button 
              (click)="closeModal()"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button 
              (click)="saveItem()"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InventoryComponent implements OnInit {
  isModalOpen = false;
  newItem: InventoryItem = {
    name: '',
    description: '',
    imageUrl: '',
    userId: '',
    createdAt: new Date()
  };

  inventoryItems: InventoryItem[] = [];
  selectedFile: File | null = null;
  searchQuery: string = '';
  username: string = '';

  constructor(private inventoryService: InventoryService, private userService: UserService) {}

  ngOnInit() {
    this.loadItems();
    this.userService.getAuthState().subscribe(username => {
      if (username) {
        this.username = username;
      } else {
        this.username = 'User';
      }
    });
  }

  loadItems() {
    this.inventoryService.getItems().subscribe(
      items => {
        this.inventoryItems = items;
      },
      error => {
        console.error('Error loading items:', error);
      }
    );
  }

  handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newItem.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file');
    }
  }

  saveItem() {
    if (!this.selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newItem.name);
    formData.append('description', this.newItem.description);
    formData.append('image', this.selectedFile);

    this.inventoryService.createItem(formData).subscribe(
      (response) => {
        this.inventoryItems.push(response);
        this.closeModal();
        this.loadItems(); // Reload items from server
      },
      (error) => {
        console.error('Error saving item:', error);
        alert('Error saving item');
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newItem = {
      name: '',
      description: '',
      imageUrl: '',
      userId: '',
      createdAt: new Date()
    };
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  removeItem(index: number) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.inventoryItems.splice(index, 1);
    }
  }

  searchItems() {
    if (this.searchQuery.trim()) {
      // Filter items based on search query
      const query = this.searchQuery.toLowerCase();
      this.inventoryService.getItems().subscribe(items => {
        this.inventoryItems = items.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      });
    } else {
      // If search query is empty, load all items
      this.loadItems();
    }
  }
}
