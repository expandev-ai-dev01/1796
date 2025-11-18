/**
 * @summary
 * Basic logger utility.
 * This is a placeholder and can be replaced with a more robust logging library like Winston or Pino.
 */

const getTimestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${getTimestamp()}: ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${getTimestamp()}: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${getTimestamp()}: ${message}`, ...args);
  },
};
