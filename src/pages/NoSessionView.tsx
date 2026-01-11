import { Banknote, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

import { useTranslation } from "@/hooks/useTranslation";

import CounterSelectorSheet from "@/pages/CounterSelectorSheet";
import { CounterData } from "@/types/cashSession";

interface NoSessionViewProps {
  facilityId: string;
  counters: CounterData[];
}

export default function NoSessionView({
  facilityId,
  counters,
}: NoSessionViewProps) {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="py-2">
      <EmptyState
        icon={<Banknote className="text-primary-500 size-8" />}
        title={t("no_active_session")}
        description={t("no_active_session_description")}
        action={
          <Button onClick={() => setIsSheetOpen(true)}>
            <PlusIcon className="mr-2 size-4" />
            {t("start_session")}
          </Button>
        }
      />

      <CounterSelectorSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        facilityId={facilityId}
        counters={counters}
        onSessionCreated={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
