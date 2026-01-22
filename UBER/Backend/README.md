# Users API — Register Endpoint

Endpoint: `POST /users/register`

Description:
- Registers a new user account. The request must include a `fullname` object with a `firstname` (required) and optional `lastname`, an `email`, and a `password`.
- Passwords are hashed before saving and a JWT token is returned on success.

Request body (JSON):

```json
{
  "fullname": { "firstname": "Alice", "lastname": "Smith" },
  "email": "alice@example.com",
  "password": "secret123"
}
```

Validation rules:
- `fullname.firstname`: required, minimum 3 characters
- `fullname.lastname`: optional, if provided minimum 3 characters
- `email`: required, must be a valid email
- `password`: required, minimum 6 characters

Responses / Status codes:
- 201 Created — Registration successful. Returns a JSON object containing a `token` and the created `user` object. Example:

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "firstname": "Alice",
    "lastname": "Smith",
    "email": "alice@example.com",
    "socketId": null
  }
}
```

- 400 Bad Request — Validation errors or missing required fields. Example:

```json
{
  "errors": [
    { "msg": "Invalid email format", "param": "email" }
  ]
}
```

- 500 Internal Server Error — Server-side error while creating the user.

Notes:
- The endpoint is defined in `routes/user.routes.js` and expects the route to be mounted (commonly) at `/users`, producing the full path `/users/register`.
- Passwords are hashed with bcrypt before saving. The response includes a JWT valid for 24 hours.

- Example: GET `/users/:id` — 200 OK — Retrieve a created user (no token returned):

```json
{
  "user": {
    "id": 1,
    "firstname": "Alice",
    "lastname": "Smith",
    "email": "alice@example.com",
    "socketId": null
  }
}
```

## Profile Endpoint

- **Endpoint:** `GET /users/profile`
- **Description:** Returns the authenticated user's profile. The route is protected by the `authUser` middleware and requires a valid JWT token.
- **Authentication:** Provide the JWT either in the `token` cookie (commonly set on login) or in the `Authorization` header as `Bearer <token>`.
- **Responses:**
  - `200 OK` — Returns the currently authenticated user object.

```json
{
  "user": {
    "id": 1,
    "firstname": "Alice",
    "lastname": "Smith",
    "email": "alice@example.com",
    "socketId": null
  }
}
```

  - `401 Unauthorized` — Missing or invalid token. Example:

```json
{
  "message": "Unauthorized"
}
```

## Logout Endpoint

- **Endpoint:** `GET /users/logout`
- **Description:** Logs out the authenticated user. Clears the `token` cookie and saves the token to the blacklist so it cannot be reused. The route is protected by the `authUser` middleware and requires a valid JWT.
- **Authentication:** Same as `/users/profile` — token in cookie or `Authorization` header.
- **Responses:**
  - `200 OK` — Logout successful.

```json
{
  "message": "Logged out"
}
```

  - `401 Unauthorized` — Missing or invalid token.

**Notes:** The logout flow saves the token to the `BlacklistToken` model so subsequent requests using that token will be rejected by the authentication middleware.
