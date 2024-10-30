import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendResponse<T>(
        data: T | null,
        message?: string | null,
        error?: any,
        success?: boolean,
        pagination?: T | null,
        token?: string
      ): void;
    }
  }
}