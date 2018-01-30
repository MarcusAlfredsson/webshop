const express = require('express');
const app = express();
const parseString = require('xml2js').parseString;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.post('/order', (req, res) => {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'Webshop',
        port: 3306
    });
    
    // console.log("creae order req", req.body);
    const order = req.body;
    const products = order.products;
    let response = {
        orderId: null,
        name: order.name,
        email: order.email,
        price: order.price,
        products: products
    };

    connection.connect();
    
    
    connection.beginTransaction((error) => {
        if (error) { 
            console.error("could not open transation", error);
            throw error;
        }
    
        const orderSql = "Insert into ´Order´ (Email, Price, ´Name´) values ('" + order.email + "', " + order.price + ", '"+ order.name +"')";
        connection.query(orderSql, (err, results) => {
            if (err) {
                connection.rollback(() => {
                    console.error("couldnt save order", err);
                    throw err;
                });
            }
            response.orderId = results.insertId

            let productsSql = "Insert into ProductOrder (OrderId, Price, ´Name´) values";
            for (var i = 0; i < products.length; i++) {
                const product = products[i];
                productsSql = productsSql + "(" + response.orderId + ", " + product.price + ", '" + product.name + "')";
                if ((products.length - 1) > i ) {
                    productsSql = productsSql + ",";
                }
            }
            connection.query(productsSql, (err, rows) => {
                if (err) { 
                    connection.rollback(() => {
                        console.error("couldnt save products", err);
                        throw err;
                    });
                }  
                connection.commit((err) => {
                    if (err) { 
                        connection.rollback(() => {
                            console.error("couldnt commit transation", err);
                            throw err;
                        });
                    }
                    connection.end();
                    return res.send(JSON.stringify(response));
                });
            });
        });
    });
});

app.get('/', (req, res) => res.send("ok"));

app.get('/products', (req, res) => {
    const fileContent = fs.readFile('./Work_sample_etraveli-addon-products.xml', 'utf-8', (err, data) => {
        var parsedXml = parseString(data, (err, result) => {
            const products = result.products.product;

            const mappedProducts = products.map((item) => {
                return {
                    id: Number(item.id[0]),
                    name: item.name[0],
                    price: Number(item.price[0]),
                    currency: item.currency[0],
                    description: item.description[0]
                }
            });
            return res.send(JSON.stringify(mappedProducts));
        });
    })
});

app.listen(4200, () => console.log("Listening to port 4200"));