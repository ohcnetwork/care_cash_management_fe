# care_cash_management_fe

`care_cash_management_fe` is a microfrontend plugin used in OHC Care to support cash management workflows.

## Getting Started

### Prerequisites

- Node.js and npm
- A configured and running Odoo Instance (for cash management integration)

## Setup Instructions

1. First, set up both Care backend and frontend before starting the `care_analytics_fe` development server.
2. Clone the CARE Analytics FE repository:

```bash
git clone git@github.com:ohcnetwork/care_analytics_fe.git
```

1. Install dependencies for CARE Analytics FE:

```bash
cd care_analytics_fe
npm install
```

1. Start the development server:

```bash
npm run start
```

## Connect Plugin to Main `care_fe`

1. Open the main Care frontend.
2. Go to **Admin Dashboard** from the navbar.
3. Open **Apps** and click **Add New Config**.
4. Add the config below (for local development, the `url` should point to your local server):

```json
{
  "url": "http://localhost:10120/assets/remoteEntry.js",
  "name": "care_analytics_fe",
  "plug": "care_analytics_fe"
}
```

## Create and Connect a Bill Counter (Care + Odoo)

1. In `care_fe`, create a counter in the required location.
2. Open the Odoo server.
3. Go to **Accounts** -> **Cash Management** (top menu) -> **Bill Counter**.
4. Create a new bill counter.
5. Keep cashier field blank.
6. In the Care ID field, add the Care ID of the counter created in `care_fe`.

The counter is now linked. Once connected, bill counter operations from Odoo can be matched with the corresponding counter configured in Care.
