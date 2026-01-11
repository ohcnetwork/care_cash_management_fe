import routes from "./routes";

const manifest = {
  plugin: "care_cash_management_fe",
  routes,
  extends: [],
  components: {},
  devices: [],
  navItems: [
    {
      name: "Cash Management",
      url: "/billing/cash",
    },
  ],
} as const;

export default manifest;
