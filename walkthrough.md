# Pool Hall Website Walkthrough

I have successfully built the pool hall website using Next.js without Tailwind, as requested.

## Features Implemented

### 1. Core Pages
- **Home**: Hero section with "Deep Forest Green" and "Antique Champagne Gold" theme, features list, and call-to-actions.
- **Events**: Lists upcoming events dynamically fetched from the backend.
    - **Loading State**: Displays a skeleton layout while fetching data.
- **Gallery**: Grid layout displaying images of the pool hall.
- **Food Menu**: Categorized menu (Small Plates, Mains, Cocktails) with prices and descriptions.
    - **Loading State**: Displays a skeleton layout for categories and items while fetching data.
- **League Standing**: Table showing team rankings and stats.
    - **Loading State**: Displays a skeleton table while fetching data.
- **Contact**: Information section and a contact form.

### 2. Admin Panel
- **Login**: Simple password-protected access (`/admin/login`). Password: `admin123`.
- **Dashboard**: Professional dashboard with a sidebar layout and premium styling.
    - **Sidebar Navigation**: Easy access to Events, Menu, and League sections.
    - **Unified Editing Experience**: All sections now use a consistent modal-based editing pattern.
    - **Events Editor**:
        - **Compact View**: Events are listed with title, date, and description snippet.
        - **Modal Editor**: Add and edit events via a clean dialog.
    - **Menu Editor**:
        - **Manage Items**: Add, edit, and delete menu items within categories.
        - **Modal Editor**: Adding and editing items is done via a modal dialog.
        - **Create Categories**: "Add Category" button opens a dialog to create new menu sections.
    - **League Editor**:
        - **Table View**: Teams are displayed in a clear table format.
        - **Modal Editor**: "Edit" button on each row opens a modal to update team stats. "Add Team" opens a modal to create a new entry.
    - **Layout**: Fixed sidebar and content area with top padding (`90px`) to account for the global fixed header.
    - **No Frame**: The decorative frame is hidden on the admin panel for a cleaner workspace.
    - **Loading State**: The dashboard displays a skeleton structure (sidebar + content) while verifying auth and fetching data.
- **Data Persistence**: Integrated **Neon (Postgres)** database for robust data storage.
    - Replaced local `data.json` with async database queries.
    - Implemented a connection pool using `pg`.

### 3. Technical Details
- **Styling**: Used CSS Modules and global CSS variables for a consistent, premium look.
- **Backend**: Next.js API Routes (`/api/admin`) handle data retrieval and updates.
- **Type Safety**: Fully typed with TypeScript.
- **Database**: Postgres (Neon) integration via `pg` driver.
- **UX Improvements**: Implemented `loading.tsx` pages and a reusable `Skeleton` component to provide visual feedback during data fetching.

## Design Overhaul: "Old Money" Aesthetic
I have refined the design to embody an "old money," elegant, and rich aesthetic:
- **Color Palette**: Updated to a sophisticated "Deep Forest Green" (`#1c261c`) and "Antique Champagne Gold" (`#c4b896`).
- **Typography**: Implemented a luxurious font stack:
    - **Headings**: `Playfair Display` for a classic, authoritative look.
    - **Subheadings/Accents**: `Cormorant Garamond` for elegant, high-contrast details.
    - **Body**: `Crimson Text` for rich, readable text.
- **Finishes**: Replaced flashy glows with matte finishes, solid borders, and subtle shadows.
- **Components**: Buttons and cards now feature understated, classic hover effects.
- **Decorative Frame**: Added elegant corner borders (40px) with vertical text "EST. IN MCMLXII" and "BOURBON STREET BILLIARDS" for a bespoke feel. Frame z-index set to 99 to sit above most content but below modals. Hidden on Admin Panel.
- **Header Layout**: Centered the navigation menu and moved the "Book Now" button to the right for a balanced, premium layout.
- **Header Style**: Updated background to `#141814` with `backdrop-filter: blur(10px)` for a sophisticated glass effect. Added a thin bottom border. Implemented scroll detection to reduce header height when scrolling. Position set to `fixed` with `width: 100%` to ensure it stays on top.
- **Header Logo**: Replaced text with `logo.png` (processed to be transparent) for a more branded appearance.
- **Home Page Buttons**: "View Events" and "See Menu" buttons are now equalized in size with a width of `234px`.
- **Hero Image**: Updated background to `IMG_9001.jpg` with a slightly adjusted overlay for better visibility.
- **Footer**: Added "Made by Takiido" credit link with subtle styling.

## Mobile Responsiveness
The website is fully responsive for mobile devices:
- **Header**: Implemented a hamburger menu for mobile navigation.
- **Book Now Button**: Refactored to use a single button element. On desktop, it sits on the right of the header. On mobile, it seamlessly moves inside the hamburger menu.
- **Layouts**: All pages adapt to smaller screens with stacked layouts and adjusted padding.
- **Typography**: Font sizes automatically adjust for better readability on mobile.
- **Frame**: The decorative frame is hidden on smaller screens to maximize space.
- **Admin Panel**:
    - **Mobile Sidebar**: The sidebar is hidden by default on mobile and can be toggled via a hamburger menu.
    - **Responsive Grids**: Card grids stack into a single column on smaller screens.
    - **Scrollable Tables**: The league table becomes horizontally scrollable on mobile to preserve data visibility.
    - **Optimized Padding**: Reduced padding and font sizes for better mobile usability.

## Database Setup (Neon)
To run the application with the database:
1.  **Environment Variable**: Create a `.env` file in the root directory and add your Neon connection string:
    ```
    DATABASE_URL=postgres://user:password@host:port/database?sslmode=require
    ```
2.  **Initialize Database**:
    - Start the server: `npm run dev`
    - Visit `http://localhost:3000/api/seed` in your browser.
    - You should see `{"message":"Database seeded successfully"}`.
    - This will create the necessary tables (`events`, `menu_categories`, `menu_items`, `league_teams`).

## Verification
- **Build**: The project builds successfully with `npm run build`.
- **Linting**: Code follows standard linting rules.

## How to Run
1. `npm install` (already done)
2. `npm run dev` to start the development server.
3. Visit `http://localhost:3000`.
4. Access Admin Panel at `http://localhost:3000/admin` (Login: `admin123`).
