import CashManagementPage from "@/pages/CashManagementPage";

const routes = {
  "/facility/:facilityId/billing/cash": ({
    facilityId,
  }: {
    facilityId: string;
  }) => <CashManagementPage facilityId={facilityId} />,
};

export default routes;
