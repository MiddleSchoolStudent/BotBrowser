FROM --platform=linux/amd64 python:3.11-slim

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV BOTBROWSER_EXEC_PATH=/usr/bin/chromium-browser-stable

RUN apt-get update && apt-get install -y \
    wget ca-certificates gnupg2 \
    libnss3 libxss1 libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libgbm1 libgtk-3-0 libdrm2 libxcomposite1 libxdamage1 \
    libxrandr2 libxkbcommon0 libpangocairo-1.0-0 libpango-1.0-0 \
    libwayland-client0 libwayland-server0 libdbus-1-3 libatspi2.0-0 \
    fonts-liberation libu2f-udev \
    libcurl4 libvulkan1 xdg-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY botbrowser_*.deb .
RUN dpkg -i botbrowser_*.deb || apt-get install -f -y

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

RUN mkdir -p /app/profile /app/screenshots

VOLUME ["/app/profile", "/app/screenshots"]

CMD ["python", "-u", "main.py"]