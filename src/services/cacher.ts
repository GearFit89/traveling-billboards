import * as v from 'valibot';
import stableCache, { Options } from './stableCache'; 
import Console from '@/utils/console';
import { ReturnData } from '@/types';
import { getIsBuildPharse } from '@/lib/utils';

const console = new Console("schema_validation");

export const getCacheAndValidation = <
  S extends v.GenericSchema
>(
  schema: S
) => {
  return async <T>(
    queryBuilder: () => Promise<T | unknown>,
    cacheKey: string,
    options?: Options,
    getDevData?: Function // Restored 4th parameter so existing calls don't break
  ): Promise<ReturnData<v.InferOutput<S>>> => {
    try {
      // 1. Skip execution during static build phase
      const isBuildPhase = getIsBuildPharse(); 
      if (isBuildPhase) {
        console.log("Build phase detected. Skipping D1 execution.");
        return { success: true, data: [] as unknown as v.InferOutput<S> };
      }
      const itemSchema = 'item' in schema ? (schema as any).item : schema;
      // 2. Validation runner
      const validationFn = async (): Promise<v.InferOutput<S>> => {
        const rawData = await queryBuilder();

        if (rawData === null || rawData === undefined) {
          console.log("data not found");
          throw new Error("Data not found");
        }

        const isArray = Array.isArray(rawData);

        // If data is an array, validate item-by-item and filter out invalid rows
        if (isArray) {
          if (rawData.length === 0) {
            return [] as unknown as v.InferOutput<S>;
          }

          return (rawData as unknown[]).filter(
            (item) => v.safeParse(itemSchema, item).success
          ) as unknown as v.InferOutput<S>;
        }

        // Single object validation
        return v.parse(schema, rawData);
      };

      // 3. Execute query
      const cacheFn = stableCache(validationFn, cacheKey, {
        getOptions: { type: "json" },
        ...options,
      });

      const data = await cacheFn();

      return { success: true, data };

    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return { 
        success: false, 
        data: null as unknown as v.InferOutput<S>, 
        error: 'Error fetching or parsing data' 
      };
    }
  };
};