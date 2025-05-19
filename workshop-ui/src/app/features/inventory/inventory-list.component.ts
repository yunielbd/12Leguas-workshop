import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehicleService } from '../../core/services/VehicleService';
import { BaseVehicle, VehicleType } from '../../models/vehicle.model';
import { VehicleEntryFormComponent } from '../entry/vehicle-entry-form.component';

type VehicleWithReg = BaseVehicle & {
  registrationInfo?: string;
  conversionInfo?: string;
  showRegistration?: boolean;
};

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    VehicleEntryFormComponent
  ],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  vehicles: BaseVehicle[] = [];
  types: VehicleType[] = ['DIESEL', 'GASOLINE', 'ELECTRIC'];
  searchTerm = '';
  selectedType: VehicleType | '' = '';
  showEntryModal = false;

  constructor(private vehicleService: VehicleService) {}

   ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getInventory().subscribe(data => {
      // inicializamos sin registrationInfo ni showRegistration
      this.vehicles = data.map(v => ({ ...v, showRegistration: false }));
    });
  }

  /** Alterna la visibilidad y carga la info si es necesario */
  toggleRegistration(v: VehicleWithReg) {
    if (!v.showRegistration) {
      if (!v.registrationInfo) {
        this.vehicleService.getRegistration(v.id!).subscribe(res => {
          // Guardamos ambos campos
          v.registrationInfo  = res.registrationInfo;
          v.conversionInfo    = res.conversionInfo;
          v.showRegistration  = true;
        });
      } else {
        v.showRegistration = true;
      }
    } else {
      v.showRegistration = false;
    }
  }

  filteredVehicles(): BaseVehicle[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.vehicles.filter(v => {
      const matchType = this.selectedType ? v.type === this.selectedType : true;
      const matchText = !term
        || v.licensePlate.toLowerCase().includes(term)
        || v.vin.toLowerCase().includes(term);
      return matchType && matchText;
    });
  }

  getDetails(v: BaseVehicle): string {
    switch (v.type) {
      case 'DIESEL':
        return `Bomba: ${(v as any).injectionPumpType}`;
      case 'ELECTRIC':
        return `Voltaje: ${(v as any).voltage}V · Corriente: ${(v as any).current}A · Batería: ${(v as any).batteryType}`;
      case 'GASOLINE':
        return `Combustibles: ${(v as any).fuelTypes.join(', ')}`;
      default:
        return '';
    }
  }

  openEntry() {
    this.showEntryModal = true;
  }

  closeEntry() {
    this.showEntryModal = false;
  }

  onVehicleCreated(){
    this.vehicleService.getInventory().subscribe(vs => this.vehicles = vs)
  }

  deleteVehicle(id: string) {
    if (!confirm('¿Eliminar este vehículo?')) return;
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      // Actualizamos la lista sin el eliminado
      this.vehicles = this.vehicles.filter(v => v.id !== id);
    });
  }
}
