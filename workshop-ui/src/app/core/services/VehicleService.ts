import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseVehicle, RegistrationInfo } from '../../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private api = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  getInventory(type?: string) {
    const params = type ? new HttpParams().set('type', type) : undefined;
    return this.http.get<BaseVehicle[]>(`${this.api}/all`, { params });
  }

  getById(id: string) {
    return this.http.get<BaseVehicle>(`${this.api}/${id}`);
  }

  getRegistration(id: string) {
    return this.http.get<RegistrationInfo>(`${this.api}/${id}/registration-info`);
  }

  deleteVehicle(id: string) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  enter(vehicle: BaseVehicle) {
    return this.http.post<BaseVehicle>(this.api, vehicle);
  }

  exit(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
