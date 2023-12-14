export class FetchError extends Error {
  code?: number;

  constructor(message: string | undefined, code: number | undefined) {
    super(message);
    this.name = "FetchError";
    this.code = code;
  }
}
