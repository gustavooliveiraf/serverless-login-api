# backend-challenge-concrete

## Routes

### sign-up
```json
/user/sign-up
{
  "name": "name",
  "email": "email@gmail.com",
  "password": "password",
  "phones": [{
      "numero": "123456789",
      "ddd": "11"
    }, {
      "numero": "012345678",
      "ddd": "22"
    }
  ]
}
```

### sign-in
```
/user/sign-in?email={email}&password={password}
```

### search
```
/user/search/:userId
```
