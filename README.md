# Blog Kerjabaik AI - API Documentation

Dokumentasi API untuk Blog Kerjabaik AI.

## Development

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deployment ke VPS

### Build untuk Production

```bash
npm run build
```

Build akan menghasilkan folder `.next/standalone` yang berisi semua file yang diperlukan untuk production.

### Menjalankan di VPS

1. **Copy file ke VPS:**
   ```bash
   # Copy folder .next/standalone dan .next/static ke VPS
   scp -r .next/standalone user@your-vps:/path/to/app
   scp -r .next/static .next/standalone/.next/static
   ```

2. **Install dependencies di VPS (jika diperlukan):**
   ```bash
   cd /path/to/app
   npm install --production
   ```

3. **Jalankan aplikasi:**
   ```bash
   # Dari folder standalone
   cd .next/standalone
   node server.js
   ```

   Atau gunakan PM2 untuk process management:
   ```bash
   npm install -g pm2
   pm2 start .next/standalone/server.js --name blog-api-docs
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx sebagai reverse proxy (opsional):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Catatan
- Aplikasi akan berjalan di port 3000 secara default
- Pastikan port 3000 terbuka di firewall VPS Anda
- Untuk production, disarankan menggunakan PM2 atau systemd untuk menjaga aplikasi tetap berjalan


