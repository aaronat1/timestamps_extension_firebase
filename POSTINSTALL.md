# Firestore Auto Timestamps — Setup Complete

The extension is now active. Every document written to Firestore will automatically receive:

- **`${param:CREATED_AT_FIELD}`** — set once at creation time.
- **`${param:UPDATED_AT_FIELD}`** — refreshed on every update.

## Verify Installation

Create a test document in any Firestore collection and confirm the timestamp fields appear.

```js
await db.collection("test").add({ name: "hello" });
// → { name: "hello", createdAt: <Timestamp>, updatedAt: <Timestamp> }
```

## Excluded Collections

Collections listed in `EXCLUDED_COLLECTIONS` will be skipped:
`${param:EXCLUDED_COLLECTIONS}`

## Support

For issues or questions visit the [GitHub repository](https://github.com/aaronat1/firestore-auto-timestamps).
