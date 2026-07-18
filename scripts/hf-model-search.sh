#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'HELP'
Search public Hugging Face text-generation models and emit compact JSON.

Usage:
  scripts/hf-model-search.sh [--query TEXT] [--limit NUMBER]

Options:
  --query TEXT   Optional model-name search term.
  --limit N      Number of models to return (1-50, default: 10).
  --help         Show this help text.

Environment:
  HF_TOKEN       Optional. Sent as a Bearer token for higher API rate limits.

Output:
  A JSON array with id, downloads, likes, pipeline tag, and last-modified date.

Example:
  scripts/hf-model-search.sh --query qwen --limit 5 | jq -r '.[].id'
HELP
}

query=""
limit="10"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --query)
      [[ $# -ge 2 ]] || { echo "Missing value for --query" >&2; exit 2; }
      query="$2"
      shift 2
      ;;
    --limit)
      [[ $# -ge 2 ]] || { echo "Missing value for --limit" >&2; exit 2; }
      limit="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if ! [[ "$limit" =~ ^[0-9]+$ ]] || (( limit < 1 || limit > 50 )); then
  echo "--limit must be an integer from 1 to 50" >&2
  exit 2
fi

headers=(-H "Accept: application/json")
if [[ -n "${HF_TOKEN:-}" ]]; then
  headers+=(-H "Authorization: Bearer ${HF_TOKEN}")
fi

params=(
  --get
  --data-urlencode "pipeline_tag=text-generation"
  --data-urlencode "sort=downloads"
  --data-urlencode "direction=-1"
  --data-urlencode "limit=${limit}"
  --data-urlencode "full=true"
)
if [[ -n "$query" ]]; then
  params+=(--data-urlencode "search=${query}")
fi

curl --fail --silent --show-error "${headers[@]}" "${params[@]}" "https://huggingface.co/api/models" |
  jq '[.[] | {id, downloads, likes, pipeline_tag, lastModified}]'
