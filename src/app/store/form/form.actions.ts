import { createAction, props } from "@ngrx/store";
import { FormState } from "src/app/shared/interfaces/form-state.interface";

export const formValueChange = createAction(
  "[Form] Value Change",
  props<FormState>()
);

export const formStateRecieved = createAction(
  "[Form] Form State Received",
  props<FormState>()
);
