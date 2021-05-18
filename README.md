git #My Shop Application

**FEATURES**
* User can:
* Create a new product info - use POST('/products')
* Fetch all products - use GET('/products')
* Fetch a single product - use GET('/products/:id')
* Update product - use PUT('/products/:id')
* Delete product - use DELETE('/products/:id')

* Hosting link: https://my-shop--app.herokuapp.com/

**TODO**
* Set up Mongoose
* Create Schema
* create routes:
                POST,
                GET,
                PUT,
                DELETE,
* Update folder structures


Data contains product info which includes:
    name
    brand
    description
    purchaseCount
    imageUrl
    Size
    color
    tag

src
    controllers
    database
    nodejs
    routes
    app.js