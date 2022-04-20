# GolMonorepo

To run backend:
`nx server backend`

To e2e test backend:
`nx test:e2e backend`

## `/board (POST)`

Adding board to database.
Returning given board and its id in db;

### Request

```json
{
  "board": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
}
```

### Response

```json
{
  "board": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  "id": "6e16c59d-9e3e-4271-9240-08c26907a4ed"
}
```

## `/tick (POST)`

Generating one generation.
Returning given board and its id in db;

### Request

```json
{
  "id": "6e16c59d-9e3e-4271-9240-08c26907a4ed"
}
```

### Response

```json
{
  "board": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  "id": "6e16c59d-9e3e-4271-9240-08c26907a4ed"
}
```
