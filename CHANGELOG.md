## Version 0.1.1

- Fix: set Node.js engine to 18 for Cloud Build compatibility.
- Add package-lock.json for reproducible builds.

## Version 0.1.0

- Initial release.
- Supports documents at depths 1–5.
- Configurable field names for `createdAt` and `updatedAt`.
- Configurable exclusion list to skip selected collections.
- Infinite-loop guard: skips update if only timestamp fields changed.
