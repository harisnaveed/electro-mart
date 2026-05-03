# ⚡ Electro Mart

A modern full-stack eCommerce web application built with **React 19 (Vite + TypeScript)** and **Core PHP**, featuring product syncing from CRM, secure Stripe payments, and a clean responsive UI powered by Tailwind CSS.

---

## 🚀 Features

- 🛒 **Dynamic Product Listing** (Synced from MyRepairApp CRM)
- 🔄 **Real-time Product Syncing**
- 💳 **Secure Payments with Stripe**
- ⚛️ **Modern Frontend with React 19**
- 🎨 **Responsive UI using Tailwind CSS v4**
- 🧭 **Client-side Routing with React Router**
- 🔍 **SEO Optimization using React Helmet Async**
- 📦 **REST API Integration (PHP Backend)**

---

## 🏗️ Project Structure

```
electro-mart/
│
├── frontend/        # React + Vite + TypeScript
├── backend/         # Core PHP APIs
├── README.md
```

---

## ⚙️ Tech Stack

### Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router DOM
- React Helmet Async
- Font Awesome Icons

### Backend

- Core PHP
- MySQL / PostgreSQL
- REST APIs

### Payment Integration

- Stripe Payment Gateway

---

## 🔥 Key Technologies Explained

### ⚛️ React 19

The latest version of React introduces improved performance, better rendering behavior, and enhanced developer experience. It helps build fast and scalable UI components.

---

### 🎨 Tailwind CSS v4

A utility-first CSS framework that allows rapid UI development with clean and responsive design. Version 4 improves performance and simplifies configuration.

---

### 🧠 React Helmet Async

Used for managing changes to the document head:

- Dynamic page titles
- Meta tags for SEO
- Social sharing optimization

---

### 💳 Stripe Integration

Secure payment processing is handled using Stripe.

- Backend creates checkout sessions
- Frontend redirects user to Stripe Checkout
- Payments are processed securely

⚠️ **Important:**
Stripe secret keys are stored securely in `.env` and never exposed in frontend code.

---

### 🔄 CRM Product Sync (MyRepairApp)

Products are dynamically fetched from MyRepairApp CRM:

- Ensures up-to-date inventory
- Eliminates manual product management
- Supports scalable product handling

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/harisnaveed/electro-mart.git
cd electro-mart
```

---

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 3️⃣ Setup Backend

- Place project in XAMPP / local server
- Configure database credentials
- Create `.env` file:

```env
STRIPE_SECRET_KEY=your_stripe_secret
DB_USER_NAME=your_db_user
DB_USER_PASSWORD=your_db_password
```

---

### 4️⃣ Run Backend

- Start Apache / PHP server
- Ensure API endpoints are accessible

---

## 🔐 Environment Variables

| Variable          | Description       |
| ----------------- | ----------------- |
| STRIPE_SECRET_KEY | Stripe secret key |
| DB_USER_NAME      | Database username |
| DB_USER_PASSWORD  | Database password |

---

## 📸 Screenshots

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Haris Naveed**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
