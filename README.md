# UCS Coordinator's Reports

A DHIS2 application for generating Health Education and Promotion structured reports for UCS Coordinators.

This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

---

## Prerequisites

- Node.js and Yarn installed
- Access to a DHIS2 instance
- A `.env` file at the project root (see [Environment Setup](#environment-setup))

---

## Environment Setup

Create a `.env` file at the project root:

```
DHIS2_BASE_URL=http://localhost:8080/
DHIS2_USERNAME=your_username
DHIS2_PASSWORD=your_password
```

`DHIS2_BASE_URL` should point to the local CORS proxy (port `8080`) during development, not directly to the DHIS2 server.

---

## Running Locally (Development)

Because the app runs on `localhost:3000` and the DHIS2 server is on a different host, browsers block the API requests due to CORS restrictions. A local proxy is included to work around this.

### Step 1 — Start the CORS proxy

Open a terminal and run:

```bash
yarn proxy
```

The proxy listens on `http://localhost:8080` and forwards all requests to the remote DHIS2 server (`170.187.199.69:8181`). It strips browser security metadata headers that cause Spring Security errors and injects proper CORS headers on responses.

You should see:
```
CORS proxy running: http://localhost:8080 → http://170.187.199.69:8181
```

Keep this terminal running.

### Step 2 — Start the app

Open a second terminal and run:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically when you make changes.

> Both the proxy and the app must be running at the same time.

---

## Building for Production

```bash
yarn build
```

This bundles the app in production mode and optimises it for performance. The output goes to the `build/` folder. A deployable `.zip` archive is generated at:

```
build/bundle/
```

---

## Deploying to DHIS2

### Option A — Using the deploy script

Run the build first, then deploy:

```bash
yarn build
yarn deploy
```

The deploy command will prompt you for:
- DHIS2 server URL
- Username
- Password

The user must have the **App Management** authority on the DHIS2 instance.

### Option B — Manual upload

1. Run `yarn build`
2. Go to your DHIS2 instance → **App Management**
3. Click **Upload App**
4. Select the `.zip` file from `build/bundle/`

---

## Available Scripts

| Command | Description |
|---|---|
| `yarn start` | Start the development server at `localhost:3000` |
| `yarn proxy` | Start the local CORS proxy at `localhost:8080` |
| `yarn build` | Build the app for production |
| `yarn deploy` | Deploy the built app to a DHIS2 instance |
| `yarn test` | Run the test suite |

---

## Learn More

- [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/)
- [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/)
- [React Documentation](https://reactjs.org/)
