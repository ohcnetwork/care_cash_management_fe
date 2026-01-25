import { atomWithStorage } from "jotai/utils";

/**
 * Location type representing a facility location/counter
 */
export interface LocationRead {
  id: string;
  name: string;
  description?: string;
  facility: string;
  // Add other location fields as needed based on API response
  [key: string]: unknown;
}

/**
 * Cache for payment reconciliation locations per facility.
 * Uses a Map-like structure with facility IDs as keys.
 */
const locationCacheAtoms = new Map<
  string,
  ReturnType<typeof atomWithStorage<LocationRead | null>>
>();

/**
 * Atom family for payment reconciliation location caching per facility.
 * Creates a persisted atom for each facility ID that stores the selected counter location.
 */
export const paymentReconcilationLocationAtom = (facilityId: string) => {
  if (!locationCacheAtoms.has(facilityId)) {
    locationCacheAtoms.set(
      facilityId,
      atomWithStorage<LocationRead | null>(
        `payment_reconcilation_location_cache--${facilityId}`,
        null,
      ),
    );
  }
  return locationCacheAtoms.get(facilityId)!;
};
