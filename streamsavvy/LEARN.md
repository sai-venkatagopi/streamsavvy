# StreamSavvy Architecture & Viva Questions

## 1. Project Architecture
This project is a **React Single Page Application (SPA)**.
- **Frontend:** React with Vite (for fast HMR).
- **Styling:** Tailwind CSS (utility classes for dark mode/responsive).
- **Backend:** JSON-Server (Mock REST API).
- **Data Fetching:** Axios (Promise-based HTTP client).
- **State:** Context API (Global) + useState (Local).

## 2. Top 5 Viva Questions

**Q1: Why use Context API instead of Props?**
A: To avoid "Prop Drilling" (passing data through many layers of components that don't need it). Context allows data like Theme or User Auth to be accessed globally.

**Q2: How does the Mini-Player persist across pages?**
A: The `<MiniPlayer />` component is placed outside the `<Routes>` in `App.jsx`. This keeps it mounted in the DOM even when the URL changes.

**Q3: What is the purpose of `useEffect`?**
A: It handles "side effects" like fetching data from the API when the component loads, or updating the DOM body class when the theme toggles.

**Q4: Explain the difference between `localStorage` and `JSON-Server`.**
A: `localStorage` is browser-only storage (cleared if cache is cleared). `JSON-Server` simulates a real remote database where data is stored in a file (`db.json`) and accessed via HTTP requests.

**Q5: What does `npx json-server --watch` do?**
A: It starts a local server that watches the `db.json` file. Any changes made via API (POST/PUT) are automatically written to the file, and changes in the file are reflected in the API.