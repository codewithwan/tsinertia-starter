# IDLabs Cloud Tunnel — Project Overview

## 🌐 Ringkasan Singkat

IDLabs Cloud Tunnel adalah sistem **reverse tunneling modern** (mirip Ngrok & Cloudflare Tunnel) yang memungkinkan developer mengekspose aplikasi lokal mereka ke internet secara aman dan cepat.

Sistem ini terdiri dari dua komponen utama:

1. **Tunnel Server (Go)**
2. **IDL CLI (Go)**

Tunnel Server menerima HTTP request dari internet, lalu meneruskannya ke client lokal melalui WebSocket. Client kemudian meneruskan request ke localhost (mis. port 3000) dan mengirim response kembali.

---

## 🚀 Tujuan Project

Project ini adalah fondasi dari **IDLabs Cloud**, layanan cloud developer-friendly untuk:

- HTTP reverse tunnel
- Static site hosting
- Custom domain routing
- SSL otomatis
- Analytics & logs
- Multi-tenant dashboard

Tunnel server adalah komponen inti yang harus ada sebelum fitur lain berjalan.

---

## 🧱 Arsitektur Utama

### **1. Tunnel Server (Go)**

Server bertugas:

- ✔ Menerima WebSocket connection dari CLI (`/ws`)
- ✔ Registrasi hostname → client
- ✔ Forward semua HTTP traffic ke tunnel-client
- ✔ Multiplexing request menggunakan UUID
- ✔ Mengirim kembali response ke browser

Flow:
Visitor → Nginx → Tunnel Server → WS → CLI → localhost:3000
↓
Response back

Tunnel server menangani ribuan request paralel dengan aman dan cepat.

---

### **2. IDL CLI (Go + Cobra)**

CLI dipakai user untuk:

- Membuka tunnel:

idl http 3000 --subdomain wan

- Login (OAuth Device Flow)
- Cek versi
- (future) Deploy website static
- (future) Kelola domain

CLI meng-handle:

- WS connection
- Forward request ke localhost
- Response encoding
- Tunnel agent lifecycle

---

# 🏗 Struktur Project

### **Tunnel Server**

idlabs-tunnel-server/
├── cmd/server/main.go
└── internal/
├── config/
├── logger/
└── tunnel/
├── http/ # HTTP → WS proxy handler
├── ws/ # client connection, hub, messages
└── registry/ # hostname → client mapping

### **IDL CLI**

idl-cli/
├── cmd/idl/main.go
└── internal/cmd/
├── root.go
├── login.go
├── http.go
└── version.go

---

# 🔧 Fitur yang Sudah Ada

### **Tunnel Server (Go)**

- WebSocket server (`/ws`)
- Register & unregister client
- In-memory registry (thread-safe)
- HTTP → WS forwarding
- Request multiplexing via UUID
- Response routing
- Chi router + logging middleware
- Clean Go architecture
- Configurable via env

### **IDL CLI**

- Cobra CLI framework
- Command:
    - `idl login`
    - `idl http <port>`
    - `idl version`
- Struktur modular siap dikembangkan

---

# 🧪 End-to-End Flow

1. User menjalankan app lokal:

localhost:3000

2. User membuka tunnel:

idl http 3000 --subdomain wan

3. CLI:

- Connect WebSocket → `/ws`
- Register hostname
- Tunggu `proxy_request`

4. Visitor membuka:

https://wan.idlabs.cloud

5. Nginx → Tunnel Server:

- Extract hostname
- Cari client
- Forward via WS

6. CLI:

- Terima request
- Forward ke localhost
- Balikan response

7. Tunnel Server → visitor:

- Kirim response ke browser

**Selesai. Tunnel berfungsi.**

---

# 🔮 Roadmap (Next Features)

### **Server**

- Redis registry
- API lookup for hostname → user
- Static hosting fallback
- Custom domain mapping
- Auth token
- Rate limiting
- Request logs & analytics

### **CLI**

- Full WS client logic
- OAuth login
- File watcher (auto-deploy)
- domain management commands
- deploy static site

### **Dashboard**

- Manage tunnels
- Domain binding
- Logs & traffic graph
- Deployments panel

---

# 🧠 Motivasi Project

IDLabs Cloud ingin menjadi:

> **Platform cloud sederhana, cepat, dan terjangkau khusus untuk developers Indonesia.**

Dengan fitur:

- Free tunnel
- Easy static deploy
- Custom domain
- Logs
- Dashboard interaktif
- CLI mudah digunakan

Reverse tunnel adalah fondasi dari semuanya.

---

# 🏁 Kesimpulan

IDLabs Cloud Tunnel adalah sistem reverse tunnel modern yang dibangun dengan Go dan CLI modular.  
Struktur clean, scalable, dan siap untuk menjadi core IDLabs Cloud ke depannya.

Tunnel-server + CLI = pondasi platform seperti Ngrok / Cloudflare Tunnel, tapi buatan lokal & open.

---
