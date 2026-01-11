import { HttpMethod, Type } from "@/lib/request";

import {
  CloseSessionRequest,
  CounterListResponse,
  OpenSessionRequest,
  SessionListResponse,
  SessionResponse,
} from "./cashSession";

export default {
  openSession: {
    path: "/api/care_odoo/facility/{facilityId}/cash-session/",
    method: HttpMethod.POST,
    TResponse: Type<SessionResponse>(),
    TRequest: Type<OpenSessionRequest>(),
  },
  closeSession: {
    path: "/api/care_odoo/facility/{facilityId}/cash-session/close/",
    method: HttpMethod.PUT,
    TResponse: Type<SessionResponse>(),
    TRequest: Type<CloseSessionRequest>(),
  },
  getCurrentSession: {
    path: "/api/care_odoo/facility/{facilityId}/cash-session/current/",
    method: HttpMethod.POST,
    TResponse: Type<SessionResponse>(),
    TRequest: Type<{
      counter_x_care_id: string;
    }>(),
  },
  listSessions: {
    path: "/api/care_odoo/facility/{facilityId}/cash-session/",
    method: HttpMethod.GET,
    TResponse: Type<SessionListResponse>(),
  },
  listCounters: {
    path: "/api/care_odoo/facility/{facilityId}/cash-session/counters/",
    method: HttpMethod.GET,
    TResponse: Type<CounterListResponse>(),
  },
} as const;
