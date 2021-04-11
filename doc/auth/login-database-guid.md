# login-flow

```
account -> authentication -> session
```

## javascript sample

## account

permitted activities:
`get | update | create | cancel`

```javascript
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
  "created-at": "2013-01-01 12:00:00Z",
  "active": true, // only approved status
  "status": "approved" // "waiting for approval" | "approved" | "reproved" | "blocked"
}
```

## authentication

permitted activities:
`get | update | create | cancel`

```javascript
{
  "account_id": "account_id",
  "password": "hashpassword",
  "attempts": 0,
  "session_limit": 3,
  "status": "offline", //"online" | "offline" | "blocked" | "created"
  "active": true,
  "auth-group": ["auth-group-id"],
  "created-at": "2013-01-01 12:00:00Z",
  "updated-at": "2013-01-01 12:00:00Z"
}
```

## auth-group

permitted activities:
`get | update | create | delete`

```javascript
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

permitted activities:
`get | create | drop`

```javascript
{
  "authentication-id": 1,
  "created-at": "2021-01-01 12:00:00Z",
  "due-date": "2021-01-02 12:00:00Z",
  "device": "unknown",
  "active": true,
  "ip": "192.168.0.1"
}
```

## activity-history

permitted activities:
`get | create`

```javascript
{
  "session-id": 1,
  "activity": "get_accounts", //get_accounts | create_account | update_account | delete_account | cancel_account
  "created-at": "2001-01-01 12:00:00Z",
  "username": "bread",
  "ip": "192.168.0.1"
}
```
