#API REQUIRMENTS
## The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

### These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# database schema

| Table  | Attibute|Types | Null/NotNull
| ------ | ------ | ------ |------ |
| Users  | id  | SERIAL PRIMARY KEY | 
|         |first_name  | VARCHAR(100) | NOT NULL
|         |last_name  | VARCHAR(100)| NOT NULL
|         |password  |VARCHAR(100) | NOT NULL


| Table  | Attibute|Types | Null/NotNull
| ------ | ------ | ------ |------ |
| products  | id  | SERIAL PRIMARY KEY | 
|         |name  | VARCHAR(100) | NOT NULL
|         |price  | VARCHAR(100)| NOT NULL


| Table  | Attibute|Types | Null/NotNull
| ------ | ------ | ------ |------ |
| orders | id  | SERIAL PRIMARY KEY | 
|        | status  | VARCHAR(50)| NOT NULL
|         |user_id  | BIGINT REFERENCES users(id) | NOT NULL


| Table  | Attibute|Types | Null/NotNull
| ------ | ------ | ------ |------ |
| order_products | id  | SERIAL PRIMARY KEY | 
|        | quantity  | integer| NOT NULL
|         |order_id | bigint REFERENCES orders(id)| NOT NULL
|         |product_id  |bigint REFERENCES products(id)| NOT NULL



# ENDPOINTS

| Name  | VERB |ENDPOINT | TOKEN |Fun Name|
| ------ | ------ | ------ |------ |------ |
|users | GET | /users | YES | index
|        | GET | /users/:id | YES | show
|        |POST | /users| No|create



| Name  | VERB |ENDPOINT | TOKEN |Fun Name|
| ------ | ------ | ------ |------ |------ |
|PRODUCTS | GET | /products| No | index
|        | GET | /products:id | NO | show
|         |POST | /products| No|create


| Name  | VERB |ENDPOINT | TOKEN |Fun Name|
| ------ | ------ | ------ |------ |------ |
|Orders | GET | /orders| YES | index
|        | GET | /orders/:id | YES | show
|         |POST | /orders| YES|create
|        | GET |/orders/user/:user_id | YES | userOrders
|         |POST | /orders/:id/products| YES|addProduct



