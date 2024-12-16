import { Routes } from "@angular/router";
import { LoginComponent } from "./components/auth";
import { RegisterComponent } from "./components/auth";
import { InventoryComponent } from "./components/inventory";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "inventory", component: InventoryComponent, canActivate: [authGuard] },
  { path: "", redirectTo: "/inventory", pathMatch: "full" },
  { path: "**", redirectTo: "/inventory"}
];
