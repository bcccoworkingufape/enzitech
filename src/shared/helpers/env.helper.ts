import * as dotenv from 'dotenv';

dotenv.config();

export class Env {
  static getStringOrDefault(name: string, def?: string | null): string | null | undefined {
    return process.env[name] ?? def;
  }

  static getString(name: string): string {
    const env = this.getStringOrDefault(name);
    if (!env) {
      throw new Error(`environment ${name} not defined.`);
    }
    return env;
  }

  static getNumber(name: string): number {
    const env = this.getString(name);
    const num = parseInt(env, 10);

    if (Number.isNaN(num)) {
      throw new Error(`expected environment ${name} to be a number.`);
    }

    return num;
  }
}
