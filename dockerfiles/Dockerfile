# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

ARG ADDON_NAME
ARG ADDON_PATH

ENV NODE_OPTIONS "--max_old_space_size=4096"
ENV CI true

USER root

RUN <<EOT
    set -e
    apt update
    apt install -y --no-install-recommends ca-certificates git-core libvips-dev
    rm -rf /var/lib/apt/lists/*
EOT

USER node

COPY --chown=node:node ./ /app/packages/${ADDON_PATH}/
COPY --chown=node:node dockerfiles/helper.js /app/

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    set -e
    node helper.js
    cp -a /app/packages/${ADDON_PATH}/public/. /app/core/packages/volto/public/
    pnpm install --fetch-timeout 600000 --shamefully-hoist
    pnpm build
    rm -rf node_modules
    pnpm install --prod --shamefully-hoist
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="RedTurtle" \
      org.label-schema.name="design-comuni-plone-theme" \
      org.label-schema.description="Plone theme for Italian Public Administration" \
      org.label-schema.vendor="RedTurtle"

COPY --from=builder /app/ /app/
