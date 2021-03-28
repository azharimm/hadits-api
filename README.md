# Hadits 9 Imam API

## 1. List Books
```
[ENDPOINT] /books
```
```
[GET] https://api-hadits.azharimm.tk/books
```

## 2. List Hadits
```
[ENDPOINT] /books/:id
```
```
[GET] https://api-hadits.azharimm.tk/books/muslim?page=1&limit=10
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| page | page of the data | `no` |
| limit | limit data being showed | `no` |

## 3. Detail Hadits
```
[ENDPOINT] /books/:id/:number
```
```
[GET] https://api-hadits.azharimm.tk/books/muslim/1
```

## 4. Range Hadits
```
[ENDPOINT] /range/:id
```
```
[GET] https://api-hadits.azharimm.tk/books/range/muslim?range=5-10
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| range | range number | `yes` |
