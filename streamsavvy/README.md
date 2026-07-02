# StreamSavvy 🎥 — Your Ultimate Entertainment Destination

StreamSavvy is a complete frontend application simulating a modern video streaming service. It demonstrates mastery of React hooks, context-based state management, client-side routing, and external API communication (mocked via JSON-Server).

## 🚀 Setup & Installation

To run this project, you need Node.js and npm installed.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/streamsavvy.git](https://github.com/your-username/streamsavvy.git)
    cd streamsavvy
    ```

2.  **Install Dependencies**
    Install all required packages (React, Tailwind, Axios, Router, Toastify, etc.).
    ```bash
    npm install
    ```

3.  **Start the Backend (JSON-Server)**
    This command watches the `db.json` file on port 5000, enabling all CRUD operations.
    **You must run this command in a separate terminal window.**
    ```bash
    npx json-server --watch db.json --port 5000
    ```

4.  **Start the Frontend**
    Open a third terminal window and run the Vite development server.
    ```bash
    npm run dev
    ```

5.  **Access App**
    Open `http://localhost:5173` (or the URL provided by Vite) in your browser.

---

## 🛠 Project Architecture

| Feature | Technology | Implementation Detail |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Functional Components & Hooks (useState, useEffect, useContext). |
| **Styling** | Tailwind CSS | Utility-first approach, used for full responsiveness and **Dark/Light mode**. |
| **Routing** | React Router DOM | Manages client-side navigation between pages (Home, Browse, Details, etc.). |
| **API Client** | Axios | Dedicated service layer (`services/movieService.js`) for CRUD operations. |
| **Mock Backend** | JSON-Server | Simulates a REST API for `/movies` and `/favorites` endpoints. |
| **Global State** | Context API | Used for `ThemeProvider`, `PlayerContext`, and `AuthProvider`. |

**Mock Authentication Credentials (for testing):**
* **Email:** `test@test.com`
* **Password:** `123`

---

## 🎓 LEARN.md (Viva Preparation)

This file contains the architectural explanation and key Q&A for your project examination.

```markdown
# StreamSavvy: Architecture Deep Dive & Viva Preparation

## 1. Project Architecture Explanation

StreamSavvy follows a clean, modular structure necessary for maintaining a scalable application:

1.  **Service Layer (Data Abstraction):** All API calls (GET, POST, PUT, DELETE) are encapsulated within `src/services/movieService.js`. This ensures that UI components never directly handle Axios or API endpoints. If the backend changes, only the service layer needs modification.
2.  **Global State Management (Context):** Critical global states are managed via Context:
    * **Theme:** Toggles dark/light mode and persists the preference in `localStorage`.
    * **Auth:** Handles mock user login/logout and persists the user status in `localStorage`.
    * **Player:** Manages the state and content of the persistent `MiniPlayer` component.
3.  **Hybrid Persistence:** The application uses two methods for data storage:
    * **JSON-Server:** Stores core application data (`movies`, `favorites`).
    * **localStorage:** Stores user-specific preferences (`theme`, `user` login status).

---

## 2. Top 10 B.Tech Viva Questions & Answers

| Question | Answer |
| :--- | :--- |
| **1. How did you implement CRUD (Create, Read, Update, Delete)?** | The CRUD operations are handled in `movieService.js` using **Axios**. The `AddEditMovie.jsx` page determines if it's a **Create** or **Update** operation by checking the URL for an `id` parameter (`useParams()`). |
| **2. Explain the Search functionality.** | Search uses the **`useDebounce`** custom hook. This hook introduces a 300ms delay after the user stops typing, preventing excessive component re-renders and unnecessary API requests, improving performance significantly. |
| **3. How does the Mini-Player persist across pages?** | The `<MiniPlayer />` component is rendered **outside** of the `<Routes>` component in `App.jsx`. This means it stays mounted in the DOM while the content inside the routes changes, ensuring video continuity. |
| **4. How is the Dark Mode implemented?** | Dark Mode is managed by the **`ThemeContext`**. It toggles the `dark` class on the root `<html>` element, allowing Tailwind CSS to apply its `dark:` utility classes globally. The preference is stored in `localStorage`. |
| **5. What is the role of the `favorites` endpoint in `db.json`?** | It stores the *relationship* between a user and a movie (`{ movieId: 2, userId: 1 }`), not the full movie details. The `MyList.jsx` page fetches this list, then uses `Promise.all` to fetch the complete movie objects for display. |
| **6. Why did you use `useNavigate` instead of `<Link>` in the form submission?** | `<Link>` is for declarative navigation (user click). `useNavigate` is for programmatic navigation, which is necessary after an asynchronous action like successful form submission (`createMovie`) or deletion (`deleteMovie`). |
| **7. How did you validate the forms?** | I used client-side validation by setting the `required` attribute on form inputs. For more complex validation, a library like **Formik** or **React Hook Form** would be integrated alongside state management. |
| **8. What is the benefit of using `Axios` interceptors?** | While not explicitly used in this simplified version, interceptors allow us to inject code before *every* request (e.g., adding an authentication token) or after *every* response (e.g., handling global errors like 401 Unauthorized). |
| **9. How would you secure the application if it wasn't mock data?** | Authentication tokens (JWTs) would be stored securely (e.g., HTTP-only cookies). Every API request would include this token, and the backend would validate it before allowing any CRUD operation. |
| **10. Where is `React Toastify` used?** | It's used to provide concise, non-intrusive feedback to the user for critical actions, such as **Login/Logout success**, **Movie Added/Updated/Deleted**, and **Adding/Removing from My List**. |