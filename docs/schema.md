# Schema Plan

## 1. User Model

Represents an authenticated user in the system.

## Fields

- email : String — Unique identifier for login.
- name : String — User's display name.
- passwordHash : String — Hashed password (if using credentials auth).
- role : String — For example: "user", "admin".
- stripeCustomerId : String — ID of the customer in Stripe.
- subscriptionStatus : String — active / trialing / canceled / none.
- quota / credits : Number — Processing limit or credit system for resume analyses.

---

## 2. Resume Model

Stores uploaded resumes for processing.

### Fields

- id : String — Unique identifier.
- userId : String — Reference to the User.
- originalFileUrl : String — Public or internal download URL.
- s3Key : String — Storage key/path in S3.
- filename : String — Original file name.
- status : String — uploaded / processing / done / failed.
- uploadedAt : Date — Timestamp of upload.

---

## 3. Analysis Model

Represents the ATS/resume analysis results.

### Fields

- id : String — Unique identifier.
- resumeId : String — Reference to Resume.
- atsScore : Number — Calculated ATS score.
- suggestions : Object (JSON) — Structured AI suggestions.
- aiOutputUrl : String — Link to improved version of resume.
- createdAt : Date — Timestamp of analysis.

---

## 4. Subscription / Payment Model

Tracks Stripe subscription and billing information.

### Fields

- stripeId : String — Subscription or payment intent ID.
- plan : String — e.g. basic / pro / enterprise.
- status : String — active / trialing / canceled / unpaid.
- nextBillingDate : Date — When the next charge is due.

---
