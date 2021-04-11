# login-flow

```
account -> authentication -> session
```

## json sample

## account

```json
{
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031 x56442",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  },
  "active": true, // only approved status
  "status": "approved" // "waiting for approval" | "approved" | "reproved" | "blocked"
}
```

## authentication

```json
{
  "account_id": "account_id",
  "password": "hashpassword",
  "attempts": 0,
  "session_limit": 3,
  "status": "active", //"active" | "blocked" | "created"
  "auth-group": ["auth-group-id"]
}
```

## auth-group

```json
{
  "title": "administrator",
  "activities": [
    {
      "account": ["all"],
      "authentication": ["get", "create", "update"],
      "session": ["get", "delete"],
      "any_router": ["any_person_action"]
    }
  ]
}
```

## session

```json
{
  "authentication-id": 1,
  "created-at": "2021-01-01 12:00:00Z",
  "due-date": "2021-01-02 12:00:00Z",
  "device": "unknown",
  "ip": "192.168.0.1"
}
```

## activity-history

```json
{
  "session-id": 1,
  "activity": "get_accounts", //get_accounts | create_account | update_account | delete_account | cancel_account
  "created-at": "2001-01-01 12:00:00Z",
  "username": "bread",
  "ip": "192.168.0.1"
}
```
