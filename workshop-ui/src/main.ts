import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { inventoryRoutes } from './app/features/inventory/inventory.routes';
import { entryRoutes } from './app/features/entry/entry.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      ...inventoryRoutes,
      ...entryRoutes,
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      { path: '**', redirectTo: 'inventory' },
    ]),
  ]
}).catch(err => console.error(err));