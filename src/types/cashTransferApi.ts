import { HttpMethod, Type } from "@/lib/request";

import {
  AcceptTransferRequest,
  CancelTransferRequest,
  CreateTransferRequest,
  RejectTransferRequest,
  TransferListResponse,
  TransferResponse,
} from "@/types/cashTransfer";

export default {
  createTransfer: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/",
    method: HttpMethod.POST,
    TResponse: Type<TransferResponse>(),
    TRequest: Type<CreateTransferRequest>(),
  },
  acceptTransfer: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/{transferId}/accept/",
    method: HttpMethod.PUT,
    TResponse: Type<TransferResponse>(),
    TRequest: Type<AcceptTransferRequest>(),
  },
  rejectTransfer: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/{transferId}/reject/",
    method: HttpMethod.PUT,
    TResponse: Type<TransferResponse>(),
    TRequest: Type<RejectTransferRequest>(),
  },
  cancelTransfer: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/{transferId}/cancel/",
    method: HttpMethod.PUT,
    TResponse: Type<TransferResponse>(),
    TRequest: Type<CancelTransferRequest>(),
  },
  getPendingTransfers: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/pending/",
    method: HttpMethod.GET,
    TResponse: Type<TransferListResponse>(),
  },
  getSentTransfers: {
    path: "/api/care_odoo/facility/{facilityId}/cash-transfer/",
    method: HttpMethod.GET,
    TResponse: Type<TransferListResponse>(),
  },
} as const;
