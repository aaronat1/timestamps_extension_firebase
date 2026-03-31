"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimestampsL5 = exports.addTimestampsL4 = exports.addTimestampsL3 = exports.addTimestampsL2 = exports.addTimestampsL1 = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
const CREATED_AT_FIELD = process.env.CREATED_AT_FIELD ?? "createdAt";
const UPDATED_AT_FIELD = process.env.UPDATED_AT_FIELD ?? "updatedAt";
const EXCLUDED_COLLECTIONS = (process.env.EXCLUDED_COLLECTIONS ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
async function handleWrite(change, collection) {
    if (EXCLUDED_COLLECTIONS.includes(collection)) {
        return null;
    }
    const before = change.before;
    const after = change.after;
    if (!after.exists) {
        return null;
    }
    const now = admin.firestore.FieldValue.serverTimestamp();
    const isCreate = !before.exists;
    const update = {
        [UPDATED_AT_FIELD]: now,
    };
    if (isCreate) {
        update[CREATED_AT_FIELD] = now;
    }
    if (!isCreate) {
        const afterData = after.data();
        const beforeData = before.data();
        const changedKeys = Object.keys(afterData).filter((k) => k !== UPDATED_AT_FIELD &&
            k !== CREATED_AT_FIELD &&
            JSON.stringify(afterData[k]) !== JSON.stringify(beforeData[k]));
        if (changedKeys.length === 0) {
            functions.logger.info("Skipping timestamp update — no non-timestamp fields changed.", { documentPath: after.ref.path });
            return null;
        }
    }
    functions.logger.info(`Stamping document (${isCreate ? "create" : "update"})`, {
        documentPath: after.ref.path,
        fields: Object.keys(update),
    });
    try {
        await after.ref.update(update);
    }
    catch (err) {
        functions.logger.error("Failed to write timestamps", { err });
    }
    return null;
}
function extractTopCollection(path) {
    return path.split("/")[0] ?? "";
}
exports.addTimestampsL1 = functions.firestore
    .document("{c1}/{d1}")
    .onWrite((change, ctx) => handleWrite(change, extractTopCollection(change.after.ref?.path ?? change.before.ref.path)));
exports.addTimestampsL2 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}")
    .onWrite((change, ctx) => handleWrite(change, extractTopCollection(change.after.ref?.path ?? change.before.ref.path)));
exports.addTimestampsL3 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}")
    .onWrite((change, ctx) => handleWrite(change, extractTopCollection(change.after.ref?.path ?? change.before.ref.path)));
exports.addTimestampsL4 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}")
    .onWrite((change, ctx) => handleWrite(change, extractTopCollection(change.after.ref?.path ?? change.before.ref.path)));
exports.addTimestampsL5 = functions.firestore
    .document("{c1}/{d1}/{c2}/{d2}/{c3}/{d3}/{c4}/{d4}/{c5}/{d5}")
    .onWrite((change, ctx) => handleWrite(change, extractTopCollection(change.after.ref?.path ?? change.before.ref.path)));
