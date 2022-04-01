# Farm Products App
Basic CRUD operations on Product model.

## View all Farm Products
    GET /products
## View info about single farm product
    GET /products/:id
## Form to create farm product
    GET /products/new
## Create a Farm product
    POST  /products
## Form to Update a specific farm product
    GET /products/:id/edit
## Update a specific farm product
    PUT /products/:id
## Delete a specific farm product
    DELETE /products/:id

## Filtering product based on category.

    GET /products?category=fruit