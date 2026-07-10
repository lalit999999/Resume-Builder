# texlive/texlive ships a full TeX Live scheme. Tectonic's on-demand CTAN
# fetching is lighter, but its bundle's coverage of fontawesome5 + tcolorbox
# ([most] library) + titlesec together is inconsistent across versions, and
# this template pulls in cfr-lm/marvosym too. Full TeX Live trades image size
# for guaranteed package availability on first compile, no network fetch
# needed at request time.
FROM texlive/texlive:latest AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 1001 compiler \
    && useradd --uid 1001 --gid compiler --shell /bin/bash --create-home compiler

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server.ts compile.ts ./

RUN mkdir -p /tmp/resume-compile && chown -R compiler:compiler /app /tmp/resume-compile

USER compiler

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
