// src/app/features/entry/vehicle-entry-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../core/services/VehicleService';
import { BaseVehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle-entry-form.component.html',
  styleUrls: ['./vehicle-entry-form.component.scss']
})
export class VehicleEntryFormComponent {
  @Output() created = new EventEmitter<BaseVehicle>();
  @Output() close   = new EventEmitter<void>();

  fuelOptions = ['B83','B90','B94','B100'];
  pumpOptions = ['LINEAR','ROTARY'];
  convTypes   = ['GASOLINE'] as const;

  form = this.fb.group({
    type:         ['ELECTRIC', Validators.required],
    licensePlate: ['', Validators.required],
    vin:          ['', Validators.required],

    // eléctricos puros
    batteryType:  ['GEL'],
    voltage:      [0, Validators.min(0)],
    current:      [0, Validators.min(0)],

    // conversión (sólo para eléctricos)
    convert:           [false],
    conversionType:    ['GASOLINE'],      // GASOLINE | DIESEL
    conversionFuelTypes: [[]],            // sólo si GASOLINE
    conversionPumpType:   ['LINEAR'],     // sólo si DIESEL

    // diésel puro
    injectionPumpType: ['LINEAR'],

    // gasolina pura
    fuelTypes: [[]],

    converted:       [false]
  });

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    // Construir sólo con campos no vacíos y según lógica
    const payload: any = {
      type: raw.type,
      licensePlate: raw.licensePlate,
      vin: raw.vin,
      converted: raw.convert
    };

    if (raw.type === 'DIESEL') {
      payload.injectionPumpType = raw.injectionPumpType;
    }
    if (raw.type === 'GASOLINE') {
      payload.fuelTypes = raw.fuelTypes;
    }
    if (raw.type === 'ELECTRIC') {
      payload.batteryType = raw.batteryType;
      payload.voltage     = raw.voltage;
      payload.current     = raw.current;

      if (raw.convert) {
        payload.conversionType = raw.conversionType;
        if (raw.conversionType === 'GASOLINE') {
          payload.conversionFuelTypes = raw.conversionFuelTypes;
        } else {
          payload.conversionPumpType = raw.conversionPumpType;
        }
      }
    }

    this.vehicleService.enter(payload as BaseVehicle).subscribe({
      next: v => {
        this.created.emit(v);
        // reset solo valores específicos
        this.form.reset({
          type: 'ELECTRIC',
          licensePlate: '',
          vin: '',
          batteryType: 'GEL',
          voltage: 0,
          current: 0,
          convert: false,
          conversionType: 'GASOLINE',
          conversionFuelTypes: null,
          conversionPumpType: 'LINEAR',
          injectionPumpType: 'LINEAR',
          fuelTypes: null,
          converted: false
        });
      },
      error: err => console.error(err)
    });
  }

  onCancel() {
    this.close.emit();
  }
}
