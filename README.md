# 🏆 UWUFUFU 2

Site communautaire de tournois,, où les utilisateurs votent pour leurs favoris dans des brackets éliminatoires.

---

## 🚀 Fonctionnalités prévues

- 🎮 Tournois personnalisables (items, catégories, stats)
- 👥 Création de compte, votes, préférences
- 🧑‍⚖️ Modération (front et dashboard)
- 📊 Dashboard admin séparé
- 🖼️ Upload et gestion d’images locale
- ⚙️ Déploiement full local via Docker sur VPS

---

## 🧱 Stack technique

| Partie           | Techno principale                                |
| ---------------- | ------------------------------------------------ |
| Frontend         | [Next.js](https://nextjs.org/) (React, SSR)      |
| Backend API      | [Express.js](https://expressjs.com/)             |
| ORM              | [Sequelize](https://sequelize.org/) + PostgreSQL |
| Dashboard        | React + Vite (SPA)                               |
| Auth             | JWT + Bcrypt                                     |
| Base de données  | PostgreSQL                                       |
| Conteneurisation | Docker + Docker Compose                          |
| Reverse proxy    | NGINX                                            |
| Hébergement      | VPS OVH (Debian)                                 |

---

## 📁 Structure du projet

uwufufu2/
├── backend/ # API Express + Sequelize
│ └── uploads/ # Dossier d'images
├── frontend/ # Next.js app (site public)
├── dashboard/ # React + Vite admin panel
├── nginx/ # Config NGINX (reverse proxy)
├── docker-compose.yml
├── .env # Variables d'environnement
└── README.md

---

## ⚙️ Lancer le projet en local (avec Docker)

### 📦 Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Port `80` libre (pour NGINX)

### 🏁 Commandes

```bash
# 1. Cloner le repo
git clone git@github.com:<tonuser>/uwufufu2.git
cd uwufufu2

# 2. Lancer les services
docker compose up --build
```

---

### 📍 Accès

Service URL
Frontend http://localhost/
Backend http://localhost/api
Images http://localhost/uploads/

---

### 🌱 Contribuer

    Fork ou clone ce dépôt

    Crée une branche dédiée à ta feature :

```bash
git checkout -b feature/<nom-de-ta-feature>
```

    Commits clairs et réguliers

    Pull Request vers dev

---

### 📜 Licence

MIT – libre d’utilisation, modification et distribution.

### 🧠 À venir

    🔒 Auth multi-rôles (admin / modo / user)

    🗳️ Algorithmes de stats pondérées

    🎨 Editeur de tournoi avancé

    🛡️ Sécurité production (rate-limit, HTTPS, fail2ban, etc.)

Made with ❤️ by Ascens and Mxou
