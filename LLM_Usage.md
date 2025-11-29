# LLM Usage Report

## 1. How We Used AI
We utilized AI strictly as a **"Smart Documentation"** and **"Boilerplate Generator"** tool. The core development process was human-led:

* **Reference & Syntax:** Instead of searching StackOverflow, we used AI to quickly look up syntax for specific libraries (Sequelize, Recharts, Framer Motion).
* **Boilerplate Code:** Generating repetitive code structures (e.g., basic HTML layout, initial migration files) to save typing time.
* **Error Explanation:** pasting error logs to understand the meaning of obscure error messages before fixing them manually.

---

## 2. Representative Prompts Used
The prompts focused on specific, isolated tasks rather than generating full features:

* *"What is the correct syntax to define a One-to-Many relationship in Sequelize?"*
* *"Show me a basic example of a Framer Motion hover effect."*
* *"How to center a div using Tailwind CSS?"*
* *"Explain the difference between `useEffect` and `useLayoutEffect`."*
* *"Generate a markdown table template for API endpoints."*

---

## 3. AI Contribution Levels

| Category | AI Contribution | Description |
| :--- | :---: | :--- |
| **System Architecture** | **0%** | The Client-Server model, Folder structure, and Data flow were designed entirely by humans. |
| **Frontend Logic** | **25%** | AI provided UI snippets (HTML/CSS). Humans implemented State Management, Hooks, Context API, and Data integration. |
| **Backend Logic** | **30%** | AI suggested basic CRUD functions. Humans built the complex Scraping logic, Middleware, and Controller structures. |
| **Database Design** | **10%** | AI suggested data types. Humans designed the Schema, Relations, and Indexing strategies. |
| **Debugging** | **40%** | AI explained error messages. Humans traced and fixed the root causes in the logic. |

---

## 4. Human-in-the-loop & Code Ownership

Since AI output was often generic or isolated, **70% of the work involved human engineering** to build a working application:

1.  **Architectural Design:**
    * AI provided isolated code snippets. We manually architected the **ProductProvider (Context API)** pattern to manage global state efficiently across the application, which AI could not foresee.

2.  **Complex Business Logic:**
    * The core feature *"Check DB -> If missing, Scrape -> Save -> Return"* was too complex for AI to generate correctly as a whole. We implemented this asynchronous flow manually to ensure data integrity and error handling.

3.  **Data Visualization Logic:**
    * AI only provided a static chart example. We wrote the logic to transform raw SQL data into the specific format required by **Recharts** (grouping ratings, calculating percentages).

4.  **UI/UX Refinement:**
    * AI-generated UI was flat and generic. We manually applied the **Glassmorphism** style, adjusted responsive breakpoints, and fine-tuned the 3D animations to ensure performance.

---

## 5. Conclusion
In this project, AI was used merely to **accelerate manual coding** (typing speed) and for **syntax lookup**. The critical thinking, problem-solving, and system integration were performed by the developers.