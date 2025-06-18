FROM --platform=linux/amd64 debian:bookworm-slim

# Path to BotBrowser binary
ENV BOTBROWSER_EXEC_PATH=/usr/bin/chromium-browser-stable
# Display for Xvfb if you want to launch browser with headful mode
ENV DISPLAY=:99

# Expose Chrome DevTools Protocol port
EXPOSE 9222

# Install runtime dependencies and Xvfb
RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb dbus-x11 ca-certificates \
    libnss3 libxss1 libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libgbm1 libgtk-3-0 libdrm2 libxcomposite1 libxdamage1 \
    libxrandr2 libxkbcommon0 libpangocairo-1.0-0 libpango-1.0-0 \
    libwayland-client0 libwayland-server0 libdbus-1-3 libatspi2.0-0 \
    fonts-liberation libu2f-udev libcurl3-gnutls libcurl4 libvulkan1 xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /botbrowser

# Copy and install BotBrowser package
COPY botbrowser_*.deb ./
RUN dpkg -i botbrowser_*.deb || apt-get update && apt-get install -f -y \
    && rm botbrowser_*.deb

# Declare mount points for profiles and user data
VOLUME ["/botbrowser/profiles", "/botbrowser/user-data-dir"]

# CMD: start Xvfb then Chromium with CDP and user args
CMD sh -c 'rm -f /tmp/.X99-lock && Xvfb :99 -screen 0 1x1x8 -ac +extension GLX +render -noreset & sleep 3 && exec "$BOTBROWSER_EXEC_PATH" --no-sandbox --headless --disable-blink-features=AutomationControlled --disable-audio-output --remote-debugging-port=9222 --remote-debugging-address=0.0.0.0 --disable-dev-shm-usage --no-first-run --disable-default-apps $CHROME_ARGS'