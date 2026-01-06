# fpilot-scraper

Automated release tracker for [FilePilot](https://filepilot.tech). Checks daily for new versions and creates GitHub releases with attested build provenance.

## How it works

1. Scrapes the download page for the latest version
2. Compares against the stored version in `version.txt`
3. If new: downloads the executable, creates a tagged release, and attests build provenance

Runs automatically via [GitHub Actions](./.github/workflows/check-update.yml) on a daily schedule

You can view attestation history in the [Actions Tab](https://github.com/Araxeus/fpilot-scraper/attestations)
