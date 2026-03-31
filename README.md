# Firestore Auto Timestamps - Firebase Extension

> Automatically adds `createdAt` and `updatedAt` timestamps to every Firestore document on creation and modification. Zero boilerplate code required.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Firebase Extension](https://img.shields.io/badge/Firebase-Extension-FFCA28?logo=firebase)](https://firebase.google.com/products/extensions)

## Why Use This Extension?

Every app that stores data in Firestore needs timestamps for auditing, sorting, and syncing. Instead of adding `createdAt` and `updatedAt` manually in every write operation across your codebase, this extension handles it automatically at the database level.

- **No code changes needed** — works with any existing Firestore collection
- **Consistent timestamps** — uses `FieldValue.serverTimestamp()` for accuracy
- **Loop-safe** — detects self-updates and skips them to avoid infinite triggers
- **Configurable** — choose your own field names and exclude specific collections

## How It Works

| Event | Action |
|-------|--------|
| Document **created** | Sets both `createdAt` and `updatedAt` |
| Document **updated** | Sets only `updatedAt` (preserves original `createdAt`) |
| Document **deleted** | No action |

The extension monitors documents at depths 1 through 5 (top-level collections and up to 4 levels of subcollections).

## Installation

### Option 1: Firebase CLI

```
firebase ext:install aaronat1/firestore-auto-timestamps --project=YOUR_PROJECT_ID
```

### Option 2: From Source

```bash
git clone https://github.com/aaronat1/timestamps_extension_firebase.git
cd timestamps_extension_firebase
firebase ext:install . --project=YOUR_PROJECT_ID
```

## Configuration Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `LOCATION` | Cloud Functions deployment region | `us-central1` |
| `CREATED_AT_FIELD` | Field name for the creation timestamp | `createdAt` |
| `UPDATED_AT_FIELD` | Field name for the last-update timestamp | `updatedAt` |
| `EXCLUDED_COLLECTIONS` | Comma-separated collections to skip | _(empty)_ |

## Example

**Before (manual approach):**
```javascript
await db.collection("users").add({
  name: "Alice",
  email: "alice@example.com",
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
});
```

**After (with this extension):**
```javascript
await db.collection("users").add({
  name: "Alice",
  email: "alice@example.com",
});
// createdAt and updatedAt are added automatically!
```

**Result in Firestore:**
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

## Tech Stack

- **Runtime:** Node.js 20
- **Language:** TypeScript
- **Trigger:** Firestore `onWrite` (depths 1-5)
- **Dependencies:** `firebase-admin`, `firebase-functions`

## Billing

This extension uses Cloud Functions for Firebase, which requires the Blaze (pay-as-you-go) plan. Each document write triggers one function invocation. See [Firebase Pricing](https://firebase.google.com/pricing) for details.

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.

## Author

**[@aaronat1](https://github.com/aaronat1)**
