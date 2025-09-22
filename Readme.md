# React + Python Full-Stack Template with Firebase Authentication

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Este repositorio es un **template completo para aplicaciones web full-stack** que combina un frontend moderno en **React** con un backend en **Python (FastAPI)** y autenticación integrada con **Firebase**. Ideal para arrancar proyectos de manera rápida y escalable.

---

## 🚀 Características

* **Frontend en React**

  * Estructura moderna con componentes reutilizables
  * Ruteo dinámico con React Router
  * Manejo de estados con Context API o Redux (opcional)
* **Backend en Python**

  * FastAPI para endpoints RESTful rápidos y eficientes

* **Autenticación con Firebase**

  * Registro y login de usuarios
  * Integración con frontend React

* **CORS y seguridad**

  * Configuración lista para desarrollo y producción
* **Axios preconfigurado**

  * Para llamar a endpoints del backend desde React
* **Estructura lista para expansión**

  * Soporte para nuevas rutas, módulos y servicios

---

## 🛠️ Tecnologías utilizadas

* **Frontend:** React, React Router, Axios, Tailwind CSS (opcional)
* **Backend:** Python, FastAPI
* **Autenticación:** Firebase Authentication
* **Base de datos:** Firebase Firestore (opcional, configurable)

---

## ⚡ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TuTechGuy/full-stack-Python-React-Template.git
cd full-stack-Python-React-Template
```

### 2. Configurar el backend

```bash
cd backend
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Instalar dependencias
pip install -r requirements.txt

# Arrancar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Configurar el frontend

```bash
cd frontend
npm install
npm start
```

> Por defecto, React se conecta al backend en `http://localhost:8000`. Puedes cambiar esto en `src/api/axios.js`.

---

## 🔐 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Habilita **Authentication** → Email/Password o el proveedor que necesites.
3. Copia las credenciales al archivo `.env` en el frontend:

```env
VITE_FIREBASE_API_KEY =
VITE_FIREBASE_AUTH_DOMAIN = 
VITE_FIREBASE_STORAGE_BUCKET= 
VITE_FIREBASE_MESSAGING_SENDER_ID= 
VITE_FIREBASE_PROJECT_ID = 
VITE_FIREBASE_APP_ID =
```

4. Reinicia el frontend para que los cambios surtan efecto.

---

## 📌 Uso

* Inicia backend y frontend siguiendo los pasos anteriores.
* Regístrate con un email válido o haz login con tu usuario de Firebase.
* Accede a rutas protegidas basadas en autenticación.
* Extiende el template agregando nuevas páginas, endpoints y servicios.

---

## 🤝 Contribuciones

Si quieres contribuir:

1. Haz fork del repositorio
2. Crea una rama con tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit: `git commit -m "Agrega nueva funcionalidad"`
4. Envía un pull request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

