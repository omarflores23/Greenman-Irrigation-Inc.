#!/usr/bin/env bash
# Start an owner-review preview; this does not deploy or change publication approvals.
set -euo pipefail

greenman_repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$greenman_repo_dir"
greenman_port="${GREENMAN_PREVIEW_PORT:-3000}"
if ! [[ "$greenman_port" =~ ^[1-9][0-9]{3,4}$ ]] || ((greenman_port < 1024 || greenman_port > 65535)); then
  printf 'Choose a preview port between 1024 and 65535.\n' >&2
  exit 1
fi

# Codespaces normally supplies nvm. Reuse it without installing another manager.
greenman_node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || true)"
if [[ "$greenman_node_major" != "24" ]]; then
  greenman_nvm_script=""
  for greenman_candidate in "${NVM_DIR:-${HOME}/.nvm}/nvm.sh" /usr/local/share/nvm/nvm.sh; do
    if [[ -s "$greenman_candidate" ]]; then
      greenman_nvm_script="$greenman_candidate"
      break
    fi
  done
  if [[ -n "$greenman_nvm_script" ]]; then
    # nvm's supported shell setup is not compatible with nounset.
    set +u
    source "$greenman_nvm_script"
    nvm install 24
    nvm use 24
    set -u
  fi
fi
if ! command -v node >/dev/null || ! node -e 'const [major,minor]=process.versions.node.split(".").map(Number); process.exit(major>20 || major===20 && minor>=9 ? 0 : 1)'; then
  printf 'Node.js 24 is recommended; this site needs Node.js 20.9 or newer. Install Node 24, then rerun this command.\n' >&2
  exit 1
fi

export SITE_PUBLICATION_MODE=review
if [[ -n "${CODESPACE_NAME:-}" ]]; then
  export CONTACT_SITE_ORIGIN="https://${CODESPACE_NAME}-${greenman_port}.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-app.github.dev}"
fi

printf 'Preparing the GreenMan draft with Node %s.\n' "$(node --version)"
npm ci --cache "${GREENMAN_NPM_CACHE:-${TMPDIR:-/tmp}/greenman-npm-cache}" --no-audit --no-fund
npm run verify:assets
npm run build
printf '\nIn Codespaces, keep port %s Private and select Open in Browser. Keep this terminal running.\n' "$greenman_port"
exec npm run start -- --port "$greenman_port"
