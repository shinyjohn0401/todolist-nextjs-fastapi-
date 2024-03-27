## Project Detail

As a todolist management project this is made using NextJS for frontend. For backend, FastAPI and GIN framework are used and each project is stand alone for frontend. GIn project uses mysql database and FastAPi uses static data.

## Installation

1. Frontend requires only 'npm' or 'yarn' module for execution.
2. Install [Python](https://www.python.org/downloads/) by downloading python installation for running FastAPI project.
3. Install [Go](https://go.dev/dl/) installation for running GIN project.

## Start Frontend

1. Install Modules
    ```bash
    (env)$ yarn install
    ```

2. Run
    ```bash
    (env)$ npm run dev
    ```

    Navigate to [http://localhost:3000/](http://localhost:3000/).

## Use FastAPI as backend

* Run main.py using 'python' command installed by python installtion.

    ```bash
    (env)$ python main.py
    ```

## Use GIN framework as backend

* Gin framework can be executed using 'go' command installed by go installation. Before executing the project we need to download modules first.

1. Download all required modules.

    ```bash
    (env)$ go get .
    ```
2. Create Table before running server.

    Execute the query below in database after creating database named as "todolist_next_go".

    ```
    CREATE TABLE `product` (
    `code` varchar(20) NOT NULL DEFAULT 'x',
    `name` varchar(150) DEFAULT NULL,
    `qty` int(5) DEFAULT NULL,
    `last_updated` datetime DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ```

3. Run Server

    ```bash
    (env)$ go run .
    ```

## Tips

1. Using LIKE when executing query for mysql in GIN framework project.

    <code>
        searchQuery := "%" + strings.Trim(query, "\"") + "%" <br/>
	    results, err := db.Query("SELECT * FROM todo WHERE title LIKE ? LIMIT ? OFFSET ?", searchQuery, 6, 6*(page-1))
    </code>

    By using <strong>strings.Trim</strong> function we need to remove double quote so that the query can be formed as %query% next to LIKE operator.

2. Every function name for export need to be capital form in go.

3. Understanding about array and slice in Go.

    Array and slice are difference in many parts and the most different part is in managing memory.
    Arrays are located in memory as full size of length but slices use only size of the address of start, length and capacity values. Start meaning is the start address of the slice. You can have deep understanding of array and slice in the blog [Go: Arrays and Slices, a deep dive.](https://dev.to/dawkaka/go-arrays-and-slices-a-deep-dive-dp8#:~:text=What%20this%20means%20is%20that,segment%20of%20an%20underlying%20array.).
    One more thing need be mentioned for slice is that the capacity of the slice. When we append the slice and the capacity need to be expanded for the first time the slice expands capacity as 2 times of original capacity.

    ```
    numbers := []int{1, 2, 3, 4} // len: 4, cap: 4
    numbers = append(numbers, 5) // len: 5, cap: 8
    ```

    But when expanding more than original capacity then after the values of original capacity the slice expands 2 more for the other values.

    ```
    numbers := []int{1, 2, 3, 4} // len: 4, cap: 4
    numbers = append(numbers, 5, 6, 7, 8, 9) // len: 9, cap: 10
    // Capacity expanded 2 for appending value of 9.
    ```