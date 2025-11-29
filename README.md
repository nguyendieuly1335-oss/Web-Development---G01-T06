# E-Commerce Review Aggregator & Analytics

## 1. Introduction
This project is a web-based system that allows users to search for products and view aggregated reviews from various e-commerce platforms (Amazon, Walmart, BestBuy, etc.).

**Key Highlight:** The system automatically **scrapes** data if a product does not exist in the database, stores it, and displays it via intuitive statistical charts, providing buyers with a comprehensive overview of product quality.

---

## 2. Tech Stack

### Frontend
* **React.js (Vite):** Building the user interface.
* **Tailwind CSS:** Modern styling.
* **Framer Motion:** Motion effects and 3D animations.
* **Recharts:** Visualizing statistical charts (Bar, Pie).
* **Lucide React:** Lightweight and beautiful icon set.
* **React Router DOM:** Page navigation.

### Backend
* **Node.js & Express.js:** Building RESTful APIs.
* **Sequelize ORM:** Interacting with the database.
* **Axios:** Handling HTTP requests.

### Database & Scraper
* **MySQL:** Relational database for storing products and reviews.
* **Scraper Service (Custom):** Module for automatically collecting data from external websites.

---

## 3. Main Features

1.  **Product Search:** Users enter product names to search.
2.  **3D Product Detail:** Displays product images with floating/interactive 3D effects.
3.  **Auto-Scraping:**
    * Checks the Database.
    * If data is missing -> Triggers Scraper -> Saves to MySQL -> Returns to Client.
4.  **Analytics & Charts:**
    * Bar Chart: Star rating distribution (1-5 stars).
    * Pie Chart: Review distribution by source (Amazon, Walmart, etc.).
5.  **Filter & Sort:**
    * Filter by Source.
    * Sort by: Newest, Highest Rating, Lowest Rating.
6.  **Pagination:** "Load More" button to view more reviews without reloading the page.

---

## 4. Architecture

Data processing flow of the system:

```
A[User / Frontend] -- 1. Request Product ID --> B[Backend API]
B -- 2. Check DB --> C[(MySQL)]
C -- 3. Data Found --> B
C -- 3. Data Not Found --> D[Scraper Service]
D -- 4. Crawl External Sites --> D
D -- 5. Save Data --> C
B -- 6. Return JSON --> A
A -- 7. Render Charts & UI --> A
```

## 5. Installation & Setup Guide
To run this project locally, please follow these detailed steps:
### 5.1. Prerequisites
* **Node.js**: Version v16 or higher.
* **Docker & Docker Compose**:To run the MySQL container.
* **Git**: To clone the project.

### 5.2. Backend Setup (Server)

**Step 1: Clone the project**

Open your terminal and run the following command to download the source code:

git clone [https://github.com/your-username/project-name.git](https://github.com/your-username/project-name.git)

```
cd project-name
```
**Step 2: Cài đặt thư viện cho Backend**
```
cd backend
npm install
```

**Step 3: Configure Database & Start Docker**
1. Environment Configuration (.env)
Create a `.env` file in the `backend` folder and fill in your database configuration:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=user
DB_PASSWORD=user123
DB_NAME=review_aggregator_db
SERVER_PORT=5000
SCRAPER_BASE_URL=http://127.0.0.1:1234
```
2. Start MySQL container

```
docker-compose up -d
```

>This command will pull the MySQL image and run the container in the background.

**Step 4: Initialize Tables & Seed Data** 
After Docker is running successfully, execute the following commands sequentially:
* **Run Migration** (Create table structure):

```
npm run migration
```

* **Run Seed** (Insert sample data into DB):

```
npm run seed
```

**Step 5: Run the server**

```
npm run dev
```
> The Server will run at: http://localhost:5000

### 5.3. Frontend Setup (Client)

Open a `new` terminal, move to the root directory, and then enter the `client` folder:

```
cd ../frontend
```

**Step 1: Install dependencies**

```
npm install
```

**Step 2: CấuEnvironment Configuration (.env)**

Create a `.env` file in the `frontend` folder and fill in your database configuration:

```
VITE_API_URL=http://localhost:5000/api
```

**Step 3: Run the application (client)**

```
npm run dev
```
> The Client will run at: http://localhost:5173

### 5.4. Main API Endpoints

| Method        |      Endpoint      |  Description |
| ------------- | :-----------: | ----: |
| **GET**      | `/api/products` |Get list of products |
| **GET**      |   `/api/products/:id`    |   Get product details |
| **GET**      |   `/api/reviews/byProductId/:id`    |   Get all reviews by product ID |
| **GET** |   `/api/scrape/reviews/:productId`    |    Manually trigger the scraper |

## 6. Project Structure

Below is the file structure of the project organized by the Client-Server model:
```
review_aggregator/
│
├── frontend/                     
│   ├── public/                 
│   ├── src/
│   │   ├── assets/             
│   │   ├── components/         
│   │   ├── configs/         
│   │   ├── helper/         
│   │   ├── lib/                
│   │   ├── pages/              
│   │   ├── providers/
│   │   ├── routes/
│   │   ├── index.css
│   │   └── main.jsx 
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── backend/                     
│   ├── src/
│   │   ├── configs/         
│   │   ├── migrations/         
│   │   ├── models/                
│   │   ├── repositories/              
│   │   ├── routes/
│   │   ├── seeders/
│   │   ├── services/
│   │   ├── validator/
│   │   ├── app.js
│   │   ├── server.js
│   │   └── swagger.js
│   ├── .env
│   ├── .sequelizerc
│   ├── docker-compose.yml
│   └── package.json
├── scraper-service/                     
│   ├── src/
│   │   ├── mockup-review.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── .gitignore
├── .LLM_Usage.md
└── README.md
```









