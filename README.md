# Kervan Warehouse

Responsive React app for restaurant supply orders, inventory, branches, and delivery tracking.

## Run locally

```sh
npm install
npm run dev
```

## Demo sign-in

Use these temporary demo accounts to preview each role:

| Role | Username | Password |
| --- | --- | --- |
| System Admin | `admin` | `admin123` |
| Warehouse Admin | `warehouse` | `warehouse123` |
| Driver | `driver` | `driver123` |
| Downtown Store | `store-downtown` | `store123` |
| Riverside Store | `store-riverside` | `store123` |
| Old Town Store | `store-oldtown` | `store123` |

System Admin can add a branch with a manager phone and branch-specific Store User credentials, and can create inventory items. The demo stores records and branch demo credentials in browser local storage. This is a workflow preview only—not secure authentication; do not use real passwords or sensitive information.

## Source layout

- `src/App.jsx` owns app-wide state, data loading, navigation, and the shell.
- `src/context/AppContext.jsx` shares app state and actions with feature components.
- `src/components/ui.jsx` contains reusable form and display controls.
- `src/components/LoginPage.jsx` and `src/auth/demoAuth.js` implement the demo-only role login.
- `src/components/layout/` contains the responsive menu and footer.
- `src/features/orders/` contains the order queue, builder, review, and detail views.
- `src/features/inventory/` contains the inventory page, stock editor, and add-stock form.
- `src/features/branches/` contains branch directory editing and admin branch/store-account creation.
- `src/features/dashboard/`, `branches/`, `deliveries/`, `reports/`, and `settings/` contain the corresponding screens.
- `src/i18n/translations.js` contains English, Korean, and Turkish copy.
- `src/utils/appData.js` contains shared record defaults and domain helpers.

Feature components use `useAppContext()` for shared app state. Keep screen-specific UI and behavior in the matching feature folder; add reusable controls to `src/components/`.
