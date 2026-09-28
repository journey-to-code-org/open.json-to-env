export interface JsonToEnvOptions { separator?: string; uppercase?: boolean; sort?: boolean; }
export function jsonToEnv(input: Record<string, unknown>, options?: JsonToEnvOptions): string;

