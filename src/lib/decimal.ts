import Decimal from "decimal.js";
import z from "zod";

const careConfig = window.__CORE_ENV__ as {
  careConfig: {
    decimal: {
      internalPrecision: number;
      accountingPrecision: number;
    };
  };
};

export function roundForDisplay(value: string | number | Decimal): string {
  return new Decimal(value).toFixed(
    careConfig.careConfig.decimal.accountingPrecision,
  );
}

export function roundForApi(value: string | number | Decimal): string {
  return new Decimal(value).toFixed(
    careConfig.careConfig.decimal.internalPrecision,
  );
}

export const zodDecimal = (options?: {
  min?: number;
  max?: number;
  message?: string;
}) =>
  z
    .string()
    .refine((val) => !isNaN(Number(val)) && val.trim() !== "", {
      message: options?.message || "Must be a valid number",
    })
    .refine((val) => options?.min === undefined || Number(val) >= options.min, {
      message: `Must be at least ${options?.min}`,
    })
    .refine((val) => options?.max === undefined || Number(val) <= options.max, {
      message: `Must be at most ${options?.max}`,
    })
    .transform((val) => roundForApi(val));
