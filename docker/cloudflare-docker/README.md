# Cloudflare Docker Project

## ⚠️ **DISCLAIMER**

This Docker project is provided for **educational purposes** and to **demonstrate** the capabilities of BotBrowser. It is intended solely for **legal use cases** that comply with all applicable laws and regulations. **Any misuse**-such as violating website terms of service or engaging in unlawful activities-**is strictly prohibited.**


## Project Overview

This repository contains the Docker setup for submitting Cloudflare demo bookings using BotBrowser and Playwright, which runs a Python script (`main.py`) inside a Docker container that:

1. Launches BotBrowser in headless mode-**no XDISPLAY or GPU required**, yet fully simulates a desktop environment.
2. Submit information on Cloudflare's booking page.
3. Saves screenshots to `screenshots/`.

---

## Repo Layout

```
.
├── Dockerfile
├── docker-compose.yml
├── main.py
├── requirements.txt
├── profile/        # Place your .enc profile here
└── screenshots/    # Output screenshots per date
```

> **Tip:** Review `Dockerfile` and `docker-compose.yml` for detailed configuration options.

---

## Getting Started

1. **Add Files**

   * Place `botbrowser_*.deb` in the root directory.
   * Put your profile file (`your-profile.enc`) into `profile/`.

2. **Launch with Docker Compose**

   ```bash
   docker-compose up --build -d
   ```

3. **Monitor Logs**

   ```bash
   docker-compose logs -f cloudflare-botbrowser-service
   ```

4. **View Outputs**

   * Screenshots in `screenshots/`

---

## Troubleshooting

| Issue                  | Fix                                                                   |
| ---------------------- | --------------------------------------------------------------------- |
| Missing `.deb`         | Add `botbrowser_*.deb` to the repo root                               |
| Profile not found      | Ensure `profile/your-profile.enc` exists                              |
| Permission errors      | Make sure `profile/` and `screenshots/` are writable |
| Docker startup failure | Run without `-d` to see errors: `docker-compose up`                   |
