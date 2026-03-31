## Version 0.1.0

- Initial release.
- Supports documents at depths 1–5.
- Configurable field names for `createdAt` and `updatedAt`.
- Configurable exclusion list to skip selected collections.
- Infinite-loop guard: skips update if only timestamp fields changed.
