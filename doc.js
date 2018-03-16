
tienda/productos
tienda/producto/:id
tienda/productos/q/:str
post put delete


tienda/user
tienda/user/:id
tienda/user/q/:str
post put delete


tienda/:usuario/:pedido/addProd/:canti/:idProd
{
  "idPedido": 23,
  "total":232,
  "iva":32,
  "subTotal":200,
  "prods":[
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            },
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            }
          ]
}


tienda/:usuario/:pedido/prods
[
          { "id":1,
            "prod": {"nombre":"Costillitas con Papas", "precio":100},
            "canti":1,
            "importe":100
          },
          { "id":2,
            "prod": {"nombre":"Costillitas con Papas", "precio":100},
            "canti":1,
            "importe":100
          }
        ]


tienda/:usuario/:pedido/prods/delete/:idProd
{
  "idPedido": 23,
  "total":232,
  "iva":32,
  "subTotal":200,
  "prods":[
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            },
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            }
          ]
}
post put delete



tienda/:usuario/pedidos
[
  {
    "idPedido": 23,
    "total":232,
    "iva":32,
    "subTotal":200,
  },
  {
    "idPedido": 24,
    "total":116,
    "iva":16,
    "subTotal":100,
  }
]

tienda/:usuario/pedido/:id
{
  "idPedido": 23,
  "total":232,
  "iva":32,
  "subTotal":200,
  "prods":[
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            },
            {
              "prod": {"nombre":"Costillitas con Papas", "precio":100},
              "canti":1,
              "importe":100
            }
          ]
}

post put delete
tienda/productos/:page/:size