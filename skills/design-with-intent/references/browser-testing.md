# Browser verification

Adapted from Composio webapp-testing (Apache-2.0). DWI changes: use the project's available browser tooling, wait for meaningful UI readiness rather than requiring network idle, matched baseline capture, and explicit evidence limits. See sources.md.

## Establish a reproducible state

Inspect package scripts and the README before starting a server. Reuse a running local server when appropriate. Otherwise start the documented command, wait for readiness, and stop only processes you started. Do not kill unrelated processes to free a port. Use test data and preserve working routes and authentication.

Prefer existing browser tools and tests. Inspect the rendered DOM and accessible roles before choosing locators. Wait for the relevant heading, form, or data state; network idle may never occur on dashboards with polling. Do not replace readiness with an arbitrary sleep.

## Capture a baseline and result

The included helper captures screenshots, browser errors, small-target candidates, and page overflow:

```sh
node <skill-dir>/scripts/capture.mjs --url http://localhost:5173 --out /tmp/dwi-before --wait-for main
# Implement the scoped change, then:
node <skill-dir>/scripts/capture.mjs --url http://localhost:5173 --out /tmp/dwi-after --wait-for main
```

The helper uses the official [Playwright screenshot API](https://playwright.dev/docs/screenshots). It resolves `playwright` or `@playwright/test` from the current website project. If neither exists, use an available agent browser or install the optional dependency in that project (`npm install -D playwright`, then `npx playwright install chromium`) when permitted. Node packages and browser binaries are not bundled with DWI. `--executable /path/to/chromium` supports an existing browser. See `--help` for widths and timeouts.

The helper does not click through workflows, run an accessibility engine, compare screenshots, or judge appearance. Open its PNG files and inspect them. Its small-target list is a review queue, not a conformance verdict. It fails on navigation/capture errors; diagnostic findings remain in report.json.

## Exercise the task

Use role/name selectors for the real primary flow. Test the relevant states: choose and submit a date, filter and inspect a record, recover from an invalid form, open and dismiss a modal. Check the result rather than just whether a click succeeded. Preserve existing tests and add regression coverage where behavior is affected.

Inspect narrow reflow, desktop composition, focus visibility, keyboard operation, errors, and reduced-motion behavior. Compare the same route, viewport, content, theme, and UI state before and after. Mask or avoid sensitive records in screenshots that will be shared.

Report each executed check and evidence path. Missing browser access means “not visually verified,” not “passed.” A screenshot existing does not prove its contents are good.
