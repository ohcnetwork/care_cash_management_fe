import { HttpMethod, Type } from "@/lib/request";

import { LocationRead } from "@/state/locationCache";

export const locationApi = {
  get: {
    path: "/api/v1/facility/{facility_id}/location/{id}/",
    method: HttpMethod.GET,
    TResponse: Type<LocationRead>(),
  },
};
