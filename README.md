# 🗂️ TS Task Board — Tested with Vitest + RTL

A Kanban task board built with **TypeScript**, **React**, **Redux Toolkit**, **Tailwind CSS**, and **HTML5 Drag & Drop** — now with **comprehensive test coverage** using **Vitest** and **React Testing Library**.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Day](https://img.shields.io/badge/12--Week--Roadmap-Day%2012-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux)
![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest)
![RTL](https://img.shields.io/badge/React_Testing_Library-14-E33332?logo=testing-library)

---

## 🌟 Features

### Kanban Board (`/`)
- 3-column drag & drop board (HTML5 native)
- Add, edit, delete, toggle tasks
- Live search across all columns
- Clear completed, per-column counts
- Mobile fallback via `<select>` dropdown
- Error boundary with retry

### Data Page (`/data-page`)
- **Products** — Redux Toolkit `createAsyncThunk` (typed)
- **Users** — Custom `useFetch<User[]>` hook
- Loading skeletons, error states with retry
- Empty states
- Side-by-side comparison of two data-fetching approaches

### Testing (Day 12)
- **Unit tests** — Utilities (`filterTasksBySearch`, `formatDate`, `generateId`, `getErrorMessage`)
- **Reducer tests** — All 6 reducers + edge cases + immutability
- **Component tests** — `EmptyState`, `Footer`, `Board`
- **Integration tests** — `TaskBoard` add flow, empty validation, search filter
- **API mocking** — `vi.stubGlobal('fetch')`, URL-based responses
- **Drag & Drop tests** — Custom `DataTransfer` mock
- **Accessibility-aware queries** — `getByRole`, `aria-pressed`, `aria-label`

---

## 🧠 Testing Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **`describe` / `it`** | Every test file |
| **`expect` matchers** | `toBe`, `toHaveLength`, `toEqual`, `toContain`, `toMatch` |
| **`beforeEach` / `afterEach`** | `setup.ts` — cleanup + localStorage clear |
| **`vi.fn()`** | `fetchMock` in DataPage tests |
| **`vi.stubGlobal`** | Replace global `fetch` |
| **`vi.unstubAllGlobals`** | Cleanup in `afterEach` |
| **`mockImplementation`** | URL-based fetch responses |
| **`mockResolvedValue` / `mockRejectedValue`** | Success/failure cases |
| **`renderWithProviders`** | Custom test utility with Redux Provider |
| **`makeStore` factory** | Fresh store per test with `preloadedState` |
| **`screen.getByRole`** | Accessibility-first queries |
| **`screen.getByText`** | Text queries |
| **`screen.getByPlaceholderText`** | Input queries |
| **`within()`** | Scope queries to a region |
| **`userEvent.type` / `userEvent.click`** | Realistic user interactions |
| **`fireEvent` + `createEvent`** | Drag & drop simulation |
| **`waitFor` / `findBy*`** | Async assertions |
| **`Object.defineProperty`** | Inject `dataTransfer` in events |

---

## 📂 Test Files Overview
src/
├── test/
│ ├── setup.ts # Global setup — cleanup, localStorage clear
│ └── utils.tsx # renderWithProviders + makeStore
├── utils/
│ ├── filterTasksBySearch.test.ts # 5 cases — match, no-match, empty, case, immutable
│ ├── formatDate.test.ts # Fixed timestamp, no timezone shift
│ ├── generateId.test.ts # Format + 100 unique IDs
│ └── getErrorMessage.test.ts # 10 edge cases — null, undefined, Error, axios, oauth
├── features/tasks/
│ ├── tasksSlice.test.ts # 6 reducers + edge cases + immutability
│ ├── components/
│ │ ├── Board.test.tsx # Render, toggle, delete
│ │ ├── BoardDragDrop.test.tsx # Custom DataTransfer mock
│ │ └── ...
│ └── ...
├── components/
│ ├── Footer.test.tsx # Count, clear button state
│ └── ui/
│ └── EmptyState.test.tsx # Message render
├── pages/
│ ├── DataPage.test.tsx # 10 cases — loading, success, 404, network, empty, retry
│ └── MainPage (via TaskBoard.test.tsx) # Integration — add, validate, filter

text

---

## 🎯 Key Learnings

> "Aaj maine seekha ke **`renderWithProviders`** utility banana — ye testing infrastructure ka foundation hai. Har test mein `Provider` wrap karna repetitive hota, lekin custom util se **clean** rehta hai."

> "**`makeStore` factory** — har test ke liye fresh store. `preloadedState` se initial state control. Tests ek doosre ko affect nahi karte."

> "**`vi.stubGlobal('fetch', fetchMock)`** — global fetch replace karna. `afterEach` mein `vi.unstubAllGlobals()` se cleanup. Real network se independence."

> "**Drag & Drop testing** — jsdom mein `DataTransfer` nahi hota. Custom mock banana padta hai, `Object.defineProperty` se event mein inject karna. Ye advanced testing technique hai."

> "**`within()`** — queries ko specific region tak scope karna. `within(todoRegion).getByText(...)` — multiple regions mein same text ho toh essential hai."

> "**Accessibility = testability** — `role="region"`, `aria-label`, `aria-pressed` add karne se `getByRole` queries work karti hain. A11y improve karo, testing free mein easy ho jati hai."

> "**`getErrorMessage` ke 10 tests** — null, undefined, string, empty string, Error, empty Error, object with message, nested data.message, oauth error, number, boolean. Har possible input type."

---

## 🧪 How to Run Tests

```bash
# Install
npm install

# Watch mode
npx vitest

# Single run
npx vitest run

# Coverage
npx vitest run --coverage

# UI
npx vitest --ui