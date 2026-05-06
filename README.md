# care_cash_management_fe

`care_cash_management_fe` is a microfrontend plugin used in OHC Care to support cash management workflows.

## Getting Started

### Prerequisites

- Node.js and npm
- Odoo Instance: Configured and running with Accounts → Cash Management module available

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

## Registering the Plugin in CARE

After running the plugin locally (or deploying it), register it in your CARE
instance

## Create and Connect a Bill Counter (Care + Odoo)

1. In `care_fe`, create a counter in the required location.
2. Open the Odoo server.
3. Go to **Accounts** -> **Cash Management** (top menu) -> **Bill Counter**.
4. Create a new bill counter.
5. Keep cashier field blank.
6. In the Care ID field, add the Care ID of the counter created in `care_fe`.

The counter is now linked. Open a session for the corresponding location and start cashier operations.
