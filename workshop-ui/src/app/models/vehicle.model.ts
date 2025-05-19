export type FuelType = 'B83' | 'B90' | 'B94' | 'B100';
export type PumpType = 'LINEAL' | 'ROTATORIA';
export type BatteryType = 'GEL' | 'LITIO';

export type VehicleType = 'DIESEL' | 'GASOLINE' | 'ELECTRIC';

export interface BaseVehicle {
  /** Identificador interno */
  id?: string;
  /** Número de identificación (VIN) */
  vin: string;
  /** Matrícula */
  licensePlate: string;
  /** Tipo de vehículo */
  type: VehicleType;
  /** Indica si ha sido reconvertido */
  converted: boolean;
}

export interface RegistrationInfo {
  registrationInfo: string;
  conversionInfo: string;
  /** Identificador interno */
  id?: string;
  /** Tipo de vehículo */
  type: VehicleType;
}

export interface DieselVehicle extends BaseVehicle {
  type: 'DIESEL';
  /** Tipo de bomba de inyección */
  pumpType: PumpType;
}

export interface ElectricVehicle extends BaseVehicle {
  type: 'ELECTRIC';
  /** Tipo de batería */
  batteryType: BatteryType;
  /** Voltaje de la batería */
  voltage: number;
  /** Corriente de la batería */
  current: number;
}

export interface GasolineVehicle extends BaseVehicle {
  type: 'GASOLINE';
  /** Tipos de combustible que usa */
  fuelTypes: FuelType[];
}

/**
 * Vehículo reconvertido: 
 * extiende GasolineVehicle pero añade el VIN original eléctrico
 */
export interface ConvertedVehicle extends GasolineVehicle {
  /** VIN original antes de la reconversión */
  originalVin: string;
}
