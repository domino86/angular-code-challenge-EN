import { Action, createReducer, on } from "@ngrx/store";
import { formStateRecieved, formValueChange } from "./form.actions";
import { FormState } from "src/app/shared/interfaces/form-state.interface";
import { vehicleSubTypes, vehicleTypes } from "src/app/shared/constants/vehicle.const";

export const initialState: FormState = { 
  vehicleType: vehicleTypes[0], 
  vehicleSubType: vehicleSubTypes['auto'][0], 
  kenteken: null 
};

const formReducer = createReducer(
  initialState,
  on(
    formValueChange,
    formStateRecieved,
    (state, { ...update }) => ({ ...state, ...update })
  )
);

export function reducer(state: FormState | undefined, action: Action) {
  return formReducer(state, action);
}
