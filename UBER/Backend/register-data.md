# Register Endpoint — Request Data

This file describes the JSON payload expected by `POST /users/register`.

Schema:

- `fullname` (object, required):
  - `firstname` (string, required) — minimum 3 characters.
  - `lastname` (string, optional) — if present, minimum 3 characters.
- `email` (string, required) — must be a valid email address.
- `password` (string, required) — minimum 6 characters.

Example payload (minimal):

```json
{
  "fullname": { "firstname": "Bob" },
  "email": "bob@example.com",
  "password": "hunter2"
}
```

Notes and tips:
- The `fullname` field is a nested object; ensure `fullname.firstname` exists.
- Passwords are hashed server-side with bcrypt before being stored; send plaintext over HTTPS only.
- The API returns validation errors for missing/invalid fields (HTTP 400).

cURL example:

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Bob","lastname":"Lee"},"email":"bob@example.com","password":"hunter2"}'
```

Retrieve user example (GET):

```bash
curl http://localhost:3000/users/1
```

Sample GET response (200 OK):

```json
{
  "user": {
    "id": 1,
    "firstname": "Bob",
    "lastname": "Lee",
    "email": "bob@example.com",
    "socketId": null
  }
}
```
