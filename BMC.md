# 🧩 IDLabs Cloud — Business Model Canvas (BMC)

Platform cloud untuk developer Indonesia yang menyediakan reverse tunnel, static hosting, custom domain, dan developer tooling yang cepat, mudah, dan terjangkau.

---

## 📌 1. **Customer Segments**

- **Web developers (beginner–intermediate)**  
  Butuh cara cepat untuk deploy, testing, demo ke klien.
- **Mobile developers**  
  Perlu expose API lokal untuk testing mobile.
- **Backend developers**  
  Butuh endpoint publik untuk webhook / Discord / Telegram / Midtrans / Xendit.
- **Freelancers & agensi kecil**  
  Demo project ke klien tanpa VPS.
- **Mahasiswa / peserta bootcamp**  
  Untuk belajar deploy tanpa ribet server.
- **Tech creators & startup awal**  
  Cari alternatif murah dibanding Ngrok/CF Tunnel.
- **Hacker / pentester / CTF players**  
  Butuh expose local tools dengan aman.

---

## 📌 2. **Value Propositions**

### ⭐ Nilai utama IDLabs Cloud:

- **Free reverse tunnel** tanpa ribet.
- **Deploy static site super cepat** seperti Vercel/Netlify.
- **Custom domain + SSL otomatis**.
- **CLI singkat & user-friendly** (`idl http 3000`).
- **Dashboard modern** untuk manage tunnel & deploy.
- **Harga lebih murah dari competitor luar**.
- **Lokal (Indonesia) → latency rendah.**
- **Integrasi siap pakai untuk webhook & API dev.**
- **Support Bahasa Indonesia**.

---

## 📌 3. **Channels**

- Website resmi IDLabs Cloud (`idcloudlabs.com`)
- Subdomain developer (`idlabs.cloud`)
- GitHub Organization / Open-source repo
- YouTube Tutorial / TikTok Dev Content
- Discord Community / Telegram Group
- Ads ke:
    - komunitas developer Indonesia
    - kampus, bootcamp, komunitas IT
- Integration via docs:
    - Laravel
    - Node.js
    - Next.js
    - Golang
    - Flutter

---

## 📌 4. **Customer Relationships**

- **Self-service platform** dengan dashboard.
- **Dokumentasi lengkap** seperti Ngrok/Vercel.
- **Live chat support** untuk user premium.
- **Community-driven support** (Discord).
- **Automatic onboarding**:

    - idl login
    - idl http 3000
    - idl deploy .

- **Usage analytics** di dashboard.

---

## 📌 5. **Revenue Streams**

### 💰 Primary Revenue

- **Premium Tunnel**  
  Faster speed, no throttling, dedicated region.
- **Custom domain premium**  
  Tanpa limit.
- **Static site premium**  
  CPU/RAM upgrade.
- **Usage-based plan**  
  Bandwidth, request, build minutes.
- **Team plan**  
  Multi-user, deploy preview, logs retention.

### 💳 MRR Target:

- Rp 15.000–50.000 / bulan untuk developer lokal.

### 🛠 Future Monetization

- Managed databases (SQLite cloud / Postgres-lite)
- Hosted cron jobs
- Serverless functions
- Monitoring & uptime checker
- Object storage S3-compatible

---

## 📌 6. **Key Activities**

- Membangun & maintain reverse tunnel server (Go)
- Maintenance CLI (Go, Cobra)
- Deploy infrastructure cloud (Docker, Traefik/Nginx)
- Integrasi dashboard (Laravel + React)
- Monitoring uptime, logs, metrics
- Security patches & hardening
- Dokumentasi & tutorial
- Community growth & marketing

---

## 📌 7. **Key Resources**

### Teknologi

- Tunnel server (Go)
- CLI agent (Go)
- Dashboard (Laravel + React Inertia)
- Static site builder
- Nginx / Traefik reverse proxy
- Docker & container orchestration

### Infrastruktur

- VPS utama (16GB RAM / 8vCPU)
- Domain:
    - idcloudlabs.com (corporate)
    - idlabs.cloud (tunnel & static hosting)
- CDN / Object storage (optional)

### SDM

- 1 backend Go dev
- 1 fullstack Laravel + React dev
- 1 DevOps engineer
- 1 designer/marketing

---

## 📌 8. **Key Partners**

- Penyedia VPS (Upcloud, DO, Vultr, Hetzner)
- Cloudflare (DNS & SSL)
- Stripe / Midtrans / Xendit (pembayaran)
- GitHub (open-source exposure & CI)
- Komunitas dev lokal (IDStack, Dicoding, BuildWithAngga)

---

## 📌 9. **Cost Structure**

### Fixed Cost:

- VPS server (200–500k/bulan)
- CDN & storage (100–200k)
- Domain renewal
- Monitoring (Grafana Cloud)
- Email provider (Sendgrid/Mailgun)

### Variable Cost:

- Bandwidth usage client tunnel
- Compute cost deploy & build
- Scaling servers saat peak usage

### HR Cost:

- Waktu development
- Maintenance
- Support

---

## 🎯 Summary

IDLabs Cloud adalah **platform cloud lokal Indonesia** yang fokus pada kemudahan bagi developer:

- Reverse tunnel cepat (`idl http 3000`)
- Static hosting + custom domain
- Dashboard modern
- Harga sangat terjangkau
- Support lokal Indonesia

Dengan target pasar utama: developer, freelancer, mahasiswa, dan startup awal.
