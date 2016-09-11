# Map-Reduce and Aggregation framework

Start with common record set, change structure and apply aggregation (MongoDB)

## Description

This example covers modyfing random data downloaded from `randomuser.me` using MongoDB map-reduce and aggregation framework.

This allows to extract e.g. information about DOB:

![image](https://cloud.githubusercontent.com/assets/14539/18419550/eedf67ac-785d-11e6-8823-aaae7307c6a7.png)


Start with:
```bash
curl "http://api.randomuser.me/?results=1000&format=pretty&noinfo" | mongoimport --db test --collection users --drop
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     02016-09-11T20:52:15.084+0200	connected to: localhost
2016-09-11T20:52:15.085+0200	dropping: test.users
100 1109k  100 1109k    0     0   384k      0  0:00:02  0:00:02 --:--:--  384k
2016-09-11T20:52:18.085+0200	test.users	1.1 MB
2016-09-11T20:52:18.107+0200	test.users	1.1 MB
2016-09-11T20:52:18.107+0200	imported 1 document
```

## Author
@peterblazejewicz
