import { FormControl } from "@angular/forms";

export interface VehicleForm {
  vehicleType: FormControl<string>;
  vehicleSubType: FormControl<string>;
  kenteken: FormControl<string | null>;
}