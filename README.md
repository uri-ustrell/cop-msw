# CoP - Mock Service Worker

Mock Service Worker is an API mocking library that uses Service Worker API to intercept actual requests.

(see documentation)[https://mswjs.io/docs/]

## Install dependencies

```
> yarn install
# or
> npm install
```

# Config

Create an .env file in the root of the project with the following content:

```
ENTRY=mswCop
```

## Webpack Dev Server

```
> yarn start
# or
> npm start
```

## Test

```
> yarn test
# or
> npm test
```

## Let's code

1. Add a new handler mocking the "list all guardian" request, with the following information:

```
URL: '/theguardians'
method: 'GET'
code: 200

response:
[
  { "id": 1, "name": "Borja" },
  { "id": 2, "name": "Roger" },
  { "id": 3, "name": "Sergio" },
  { "id": 4, "name": "Ivan" },
  { "id": 5, "name": "Javi" },
  { "id": 6, "name": "Alberte" }
]
```

2. Add a new handler mocking the "add guardian" request, with the following information:

```
url: '/theguardians'
method: 'POST'
code: 201
body:
{ id: ###, name: ### }

response:
[
  { "id": 1, "name": "Borja" },
  { "id": 2, "name": "Roger" },
  { "id": 3, "name": "Sergio" },
  { "id": 4, "name": "Ivan" },
  { "id": 5, "name": "Javi" },
  { "id": 6, "name": "Alberte" }
  { "id": ###, "name": ### }
]
```

3. Add a new handler mocking the "remove guardian" request, with the following information:

```
URL: '/theguardians/:id'
method: 'DELETE'
code: 200
response:
[
  { "id": 1, "name": "Borja" },
  { "id": 2, "name": "Roger" },
  { "id": 3, "name": "Sergio" },
  { ------------------------ },
  { "id": 5, "name": "Javi" },
  { "id": 6, "name": "Alberte" }
]
```

4. On the "add guardian" request handler, mock the following error when the name is not provided:

```
URL: '/theguardians'
method: 'POST'
code: 400
response:
{ errorMessage: 'Guardian Name should be provided' }
```

5. On the "remove guardian" request handler, mock the following error when the name is not provided or it doesn't match any of the list:

```
URL: '/theguardians/:id'
method: 'DELETE'
code: 404
response:
{ errorMessage: 'Guardian Name should be provided' }
```

6. Emulate a network error when listing all guardians, without modifying the current handler, but adding a new behavior at the test level.

Hints:

- You'll find an incomplete test at App.spec.jsx.
- https://mswjs.io/docs/api/setup-server/use#runtime-request-handler
- https://mswjs.io/docs/api/response/network-error#examples

```
URL: '/theguardians'
method: 'GET'
```
