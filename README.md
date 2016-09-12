# Map-Reduce and Aggregation framework

Start with common record set, change structure and apply aggregation (MongoDB)

## Description

This example covers modyfing random data downloaded from `randomuser.me` using MongoDB map-reduce and aggregation framework.

### Steps

#### Step 01

Start with `step01.sh` to stream JSON data into MongoDB instance:

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

![image](https://cloud.githubusercontent.com/assets/14539/18420427/b31b991a-7872-11e6-9b1a-fdcfc841a320.png)

#### Step 02

Normalize data with aggregation framework using `step02.sh` into a collection of documents with following schema:

![image](https://cloud.githubusercontent.com/assets/14539/18420434/d7802f82-7872-11e6-8bf5-0c777029d03c.png)

#### Step 03

Apply map-reduce for advanced values transformation (dates, categories) and next apply aggregation framework to transform documents structure:

![image](https://cloud.githubusercontent.com/assets/14539/18420464/768342ea-7873-11e6-8cf9-84fd1ccf8c97.png)


![image](https://cloud.githubusercontent.com/assets/14539/18420473/96e01400-7873-11e6-8cb8-00c7e23c2fd0.png)

## TODO

Rewrite everything to ES6 (as MongoDB 3.2 ships with ES6 support);

## Author
@peterblazejewicz
