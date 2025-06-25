# WizzAir Docker Project

## ⚠️ **DISCLAIMER**

This Docker project is provided for **educational purposes** and to **demonstrate** the capabilities of BotBrowser. It is intended solely for **legal use cases** that comply with all applicable laws and regulations. **Any misuse**-such as violating website terms of service or engaging in unlawful activities-**is strictly prohibited.**


## Project Overview

This repository contains a Docker setup for scraping WizzAir flight prices using BotBrowser and Playwright, which runs a Python script (`main.py`) inside a Docker container that:

1. Launches BotBrowser in headless mode-**no XDISPLAY or GPU required**, yet fully simulates a desktop environment.
2. Navigates WizzAir’s booking page over a date range.
3. Intercepts API responses to gather flight data.
4. Saves JSON files to `flight_data/` and screenshots to `screenshots/`.

---

## Repo Layout

```
.
├── Dockerfile
├── docker-compose.yml
├── main.py
├── requirements.txt
├── profile/        # Place your .enc profile here
├── flight_data/    # Output JSON files per date
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
   docker-compose logs -f wizzair-botbrowser-service
   ```

4. **View Outputs**

   * JSON data in `flight_data/`
   * Screenshots in `screenshots/`

---

## main.py at a Glance

* Reads `BOTBROWSER_EXEC_PATH` and `BOT_PROFILE_PATH` from the environment.
* Iterates dates.
* Saves API response JSON and a screenshot per date.

*Modify the date range or URLs directly in `main.py`.*

---

## Troubleshooting

| Issue                  | Fix                                                                   |
| ---------------------- | --------------------------------------------------------------------- |
| Missing `.deb`         | Add `botbrowser_*.deb` to the repo root                               |
| Profile not found      | Ensure `profile/your-profile.enc` exists                              |
| Permission errors      | Make sure `profile/`, `flight_data/`, and `screenshots/` are writable |
| Docker startup failure | Run without `-d` to see errors: `docker-compose up`                   |
