import { Request, Response, NextFunction } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T | null;
  pagination: T | null;
  error: any | null;
  token?: string; 
}

declare global {
  namespace Express {
    interface Response {
      sendResponse<T>(
        data: T | null,
        message?: string | null,
        error?: any,
        success?: boolean,
        pagination?:  T | null,
        token?: string
      ): void;
    }
  }
}

const apiResponse = (req: Request, res: Response, next: NextFunction) => {
  res.sendResponse = <T>(
    data: T | null, 
    message: string | null = null, 
    error: any = null, 
    success: boolean = true, 
    pagination: T | null,
    token?: string
  ) => {


    const authHeader = req.headers['authorization'];
    const extractedToken = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
    
    
    const response: ApiResponse<T> = {
      success,
      message,
      data,
      error,
      pagination,
      token: extractedToken,
    };
    res.json(response);
  };

  next();
};

export default apiResponse;
