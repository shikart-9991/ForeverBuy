
---

## ✨ Features

- 🛒 Product catalog with **filtering** (category/sub-category) and **sorting**
- 🔥 **Latest** and **Best Seller** product listings
- 🔍 Product detail pages with related product recommendations
- 🛍️ Shopping cart powered by React Context
- 👤 User **registration** and **login** with encrypted passwords (BCrypt)
- 🔐 **Role-based access control** (`USER` / `ADMIN`) via Spring Security
- 📦 Order placement and order history
- 🚚 Order tracking by ID
- ☁️ Product images served via **Cloudinary**

---

## 🔌 API Endpoints

### Auth — `/api/auth` (public)
| Method | Endpoint              | Description           |
|--------|-----------------------|------------------------|
| POST   | `/api/auth/login`     | Log in a user          |
| POST   | `/api/auth/register`  | Register a new user    |
| POST   | `/api/auth/logout`    | Log out current user   |

### Products — `/api/product`
| Method | Endpoint                   | Access  | Description                        |
|--------|-----------------------------|---------|--------------------------------------|
| GET    | `/api/product/latest`      | Public  | Get latest products                 |
| GET    | `/api/product/bestSeller`  | Public  | Get best-selling products            |
| GET    | `/api/product/filter`      | Public  | Filter products by category/sortBy  |
| GET    | `/api/product/{id}`        | Public  | Get a single product by ID          |
| GET    | `/api/product/by-category` | Public  | Get paginated related products      |
| POST   | `/api/product/add`         | Admin   | Add new product(s)                  |

### Orders — `/api/products`
| Method | Endpoint                    | Access        | Description                   |
|--------|------------------------------|---------------|---------------------------------|
| POST   | `/api/products/orders`      | Authenticated | Place a new order              |
| GET    | `/api/products/orders`      | Authenticated | Get paginated orders for user  |
| GET    | `/api/products/orders/{id}` | Authenticated | Get order details by ID        |

### User — `/api/user`
| Method | Endpoint           | Description                          |
|--------|---------------------|----------------------------------------|
| POST   | `/api/user/create`  | Temporary endpoint to create a user   |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- Java 21
- Maven
- MySQL Server
- A Cloudinary account

### 1. Backend Setup

```bash
cd "Ecommerce Backend"
```

Create a MySQL database:
```sql
CREATE DATABASE ecomerce;
```

Configure `src/main/resources/application.properties`:
```properties
spring.application.name=Ecommerce Backend

spring.datasource.url=jdbc:mysql://localhost:3306/ecomerce
spring.datasource.username=<your-db-username>
spring.datasource.password=<your-db-password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

cloudinary.cloud.name=<your-cloudinary-cloud-name>
cloudinary.api.key=<your-cloudinary-api-key>
cloudinary.api.secret=<your-cloudinary-api-secret>
```

Run the backend:
```bash
./mvnw spring-boot:run
```

The API will run on **`http://localhost:8080`**.

### 2. Frontend Setup

```bash
cd my-app
npm install
npm run dev
```

The app will run on **`http://localhost:5173`**.

---

## 🔐 Security Notes

- Passwords hashed using **BCrypt**.
- CORS restricted to `http://localhost:5173`.
- CSRF disabled (stateless REST API).
- Public: auth endpoints, product browsing.
- Protected: order endpoints (authenticated), product creation (`ADMIN` role).

---

## 🧭 Frontend Routes

| Route                  | Page           |
|--------------------------|-----------------|
| `/`                       | Home            |
| `/collection`             | Collection      |
| `/about`                  | About           |
| `/contact`                | Contact         |
| `/product/:productId`     | Product Detail  |
| `/cart`                   | Cart            |
| `/placeorder`             | Place Order     |
| `/order`                  | Orders          |
| `/orders/:id`             | Track Order     |
| `/login`                  | Login           |
| `/register`               | Register        |
| `/logout`                 | Logout          |

---

## 🚀 Future Improvements

- Payment gateway integration (Stripe/Razorpay)
- Admin dashboard
- JWT-based authentication
- Wishlist feature
- Product reviews & ratings

---

## 📄 License

No license specified.
