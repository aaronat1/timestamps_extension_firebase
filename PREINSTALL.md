# Firestore Auto Timestamps

This extension automatically adds `createdAt` and `updatedAt` timestamp fields to every Firestore document whenever it is created or modified.

## Prerequisites

- A Firebase project with Firestore enabled.

## Billing

This extension uses Cloud Functions for Firebase, which may incur charges. See [Firebase Pricing](https://firebase.google.com/pricing) for details.

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `LOCATION` | Cloud Functions deployment region | `us-central1` |
| `CREATED_AT_FIELD` | Field name for creation timestamp | `createdAt` |
| `UPDATED_AT_FIELD` | Field name for update timestamp | `updatedAt` |
| `EXCLUDED_COLLECTIONS` | Comma-separated collections to skip | _(empty)_ |

## How It Works

1. On **document creation**: both `createdAt` and `updatedAt` are set to `FieldValue.serverTimestamp()`.
2. On **document update**: only `updatedAt` is refreshed.
3. On **document deletion**: no action is taken.
4. Updates that only change the timestamp fields themselves are ignored to avoid infinite loops.

## Security

The extension writes only the configured timestamp fields and never reads or exposes your document data.
