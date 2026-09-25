set dotenv-load

# Accept the shared setup mode. No containers need to stay running.
setup mode="": install

install:
    bun install --frozen-lockfile

start:
    bun run dev

build:
    bun run build

check:
    bun run check

deploy: install
    bun run deploy
