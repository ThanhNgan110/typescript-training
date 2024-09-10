import { LABELS } from "../constants/label";

type keyValue = keyof typeof LABELS;

export type ValidateString = {
  key: keyValue;
  value: string;
};

export type ValidateInteger = {
  key: keyValue;
  value: number;
};
