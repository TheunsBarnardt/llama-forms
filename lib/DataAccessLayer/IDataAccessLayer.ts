import { NextResponse } from "next/server";

export interface IDataAccessLayer<T> {
  ///  list: async (): Promise<NextResponse<User[]>> => {}
   /**
   * Retrieves a list of all records.
   * @returns {Promise<NextResponse<T[]>>} A response containing an array of records.
   * @example
   * ```typescript
   * const users = await userDAL.list();
   * ```
   */
  list?: () => Promise<NextResponse<T[]| NextResponse>>;
  get?: (id: number) => Promise<NextResponse<T> | NextResponse>;
  edit?: (data: T) => Promise<NextResponse>;
  create?: (data: T) => Promise<NextResponse<T>| NextResponse>;
  delete?: (id: number) => Promise<NextResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}