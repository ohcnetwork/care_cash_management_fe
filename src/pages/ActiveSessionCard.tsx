import { ArrowRightLeft, Banknote, CircleX } from "lucide-react";
import { useState } from "react";

import { formatDateTime } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonetaryDisplay } from "@/components/ui/monetary-display";

import { useTranslation } from "@/hooks/useTranslation";

import CloseSessionSheet from "@/pages/CloseSessionSheet";
import CreateTransferSheet from "@/pages/CreateTransferSheet";
import { SessionData } from "@/types/cashSession";

interface ActiveSessionCardProps {
  session: SessionData;
  facilityId: string;
}

export default function ActiveSessionCard({
  session,
  facilityId,
}: ActiveSessionCardProps) {
  const { t } = useTranslation();
  const [isCloseSheetOpen, setIsCloseSheetOpen] = useState(false);
  const [isTransferSheetOpen, setIsTransferSheetOpen] = useState(false);

  return (
    <>
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="size-5 text-green-600" />
              </CardTitle>
              <CardDescription className="mt-1">
                {session.counter_name}
              </CardDescription>
            </div>
            <Badge variant="green">{t("session_open")}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-gray-500">{t("opening_balance")}</p>
              <p className="text-lg font-semibold text-gray-900">
                <MonetaryDisplay amount={session.opening_balance} />
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-gray-500">{t("current_balance")}</p>
              <p className="text-lg font-semibold text-green-600">
                <MonetaryDisplay amount={session.expected_amount} />
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-gray-500">{t("opened_at")}</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDateTime(session.opened_at)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-gray-500">{t("cashier")}</p>
              <p className="text-sm font-medium text-gray-900">
                {session.external_user_name || "-"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsTransferSheetOpen(true)}
            >
              <ArrowRightLeft className="mr-2 size-4" />
              {t("transfer_cash")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsCloseSheetOpen(true)}
            >
              <CircleX className="mr-2 size-4" />
              {t("close_session")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <CloseSessionSheet
        open={isCloseSheetOpen}
        onOpenChange={setIsCloseSheetOpen}
        facilityId={facilityId}
        session={session}
        onSessionClosed={() => setIsCloseSheetOpen(false)}
        onTransferClick={() => setIsTransferSheetOpen(true)}
      />

      <CreateTransferSheet
        open={isTransferSheetOpen}
        onOpenChange={setIsTransferSheetOpen}
        facilityId={facilityId}
        session={session}
      />
    </>
  );
}
