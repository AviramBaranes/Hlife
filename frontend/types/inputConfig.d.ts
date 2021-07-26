export interface ValidationRules {
  isAlpha?: boolean;
  isAlphanumeric?: boolean;
  isEmail?: boolean;
  minLength?: number;
}

export interface ComplexInputListObject {
  value: string;
  touched: boolean;
  valid: boolean;
  rules: ValidationRules;
  htmlFor?: string;
  label?: string;
  type?: string;
}
