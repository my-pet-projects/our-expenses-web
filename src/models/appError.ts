export interface SerializedAppError {
  name?: string;
  message?: string;
  code?: string;
}

export const serializeError = (err: unknown): SerializedAppError => {
  if (err instanceof Error) {
    return {
      message: err.message,
      name: err.name
    } as SerializedAppError;
  }

  return {
    message: String(err)
  } as SerializedAppError;
};

export class AppError extends Error {
  constructor(message: string, cause: unknown) {
    super(message);
    this.name = 'AppError';
    this.message = message;
    if (cause instanceof Error) {
      this.cause = cause;
    }
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class HttpError<T> extends Error {
  private response?: T | undefined;
  constructor(message: string, response: T | undefined) {
    super(message);
    this.name = 'HttpError';
    this.response = response;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
