import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/react";
import { useTranslation } from "react-i18next";

import { query } from "@/lib/request";

import Page from "@/components/common/Page";

import ActiveSessionCard from "@/pages/ActiveSessionCard";
import NoSessionView from "@/pages/NoSessionView";
import PendingTransfersCard from "@/pages/PendingTransfersCard";
import SessionHistorySheet from "@/pages/SessionHistorySheet";
import { authUserAtom } from "@/state/user-atom";
import { SessionData } from "@/types/cashSession";
import cashSessionApi from "@/types/cashSessionApi";

interface CashManagementPageProps {
  facilityId: string;
}

export default function CashManagementPage({
  facilityId,
}: CashManagementPageProps) {
  const { t } = useTranslation();
  const user = useAtomValue(authUserAtom);

  // Get counters to check for active session
  const { data: countersResponse, isLoading: isLoadingCounters } = useQuery({
    queryKey: ["cash-counters", facilityId],
    queryFn: query(cashSessionApi.listCounters, {
      pathParams: { facilityId: facilityId },
    }),
  });

  // Find counter where current user has an active session
  const userCounter = countersResponse?.counters?.find((counter) =>
    counter.open_sessions.some(
      (session) => session.external_user_id === user?.id,
    ),
  );

  // Get current session if user has one - only fetch when we have a valid counter
  const counterXCareId = userCounter?.x_care_id;
  const { data: sessionResponse, isLoading: isLoadingSession } = useQuery({
    queryKey: ["cash-session-current", facilityId, counterXCareId],
    queryFn: query(cashSessionApi.getCurrentSession, {
      pathParams: { facilityId: facilityId },
      body: {
        counter_x_care_id: counterXCareId ?? "",
      },
    }),
    enabled: !!counterXCareId,
  });

  const currentSession: SessionData | null = sessionResponse?.session ?? null;
  const counters = countersResponse?.counters ?? [];

  const isLoading = isLoadingCounters || (userCounter && isLoadingSession);

  return (
    <Page title={t("cash_management")}>
      <div className="mx-auto max-w-4xl space-y-6 py-4">
        <div className="flex justify-end">
          <SessionHistorySheet
            facilityId={facilityId}
            userId={user?.id ?? ""}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : currentSession ? (
          <>
            <ActiveSessionCard
              session={currentSession}
              facilityId={facilityId}
            />
            <PendingTransfersCard
              facilityId={facilityId}
              session={currentSession}
            />
          </>
        ) : (
          <NoSessionView facilityId={facilityId} counters={counters} />
        )}
      </div>
    </Page>
  );
}
