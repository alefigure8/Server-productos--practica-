const express = require('express')
const Contenedor = require('./Contenedor.js')

// init express
const app = express()


// port
app.set('port', 8080)


// init class Contendedor
async function classContenedor(){
  const products = new Contenedor();
  const products_array = await products.getAll();
  return products_array
}


// routes
app.get('/', (req, res) => {
  res.status(200).send(`
  <h1>Listado de productos</h1>
  <p>Alejandro Gomez Nieto</p>
  <p>Entregable Nº 3 - Backend - Coderhouse</p>
  <ul>
    <li><a href="/productos">Productos</a></li>
    <li><a href="/productosJson">Productos (JSON)</a></li>
    <li><a href="/productosRandom">Productos Random</a></li>
    <li><a href="/productosRandomJson">Productos Random (JSON)</a></li>
  </ul>
  `)
})


app.get('/productos', async (req, res) => {
  const products = await classContenedor()
  const products_html = products.map(el => `

  <p>${el.id}</p>
  <p style="font-weight: bold">${el.title}</p>
  <p>${el.price}</p>
  <img src="${el.thumbnail}" style="width: 150px" />
  `)

   res.status(200).send(`
   <h1>Productos</h1>
   <a href="/">Volver</a>
   ${products_html.join(' ')}
   `)
})

app.get('/productosJson', async (req, res) => {
  const products = await classContenedor()
  res.status(200).json(products)
})

app.get('/productosRandom', async (req, res) => {
  const products = await classContenedor()
  const product = products[Math.floor(Math.random()*products.length)]

  const products_html = `
  <p>${product.id}</p>
  <p style="font-weight: bold">${product.title}</p>
  <p>${product.price}</p>
  <img src="${product.thumbnail}" style="width: 150px" />
  `

  res.status(200).send(`
   <h1>Productos</h1>
   <a href="/">Volver</a>
   ${products_html}
   `)
})

app.get('/productosRandomJson', async (req, res) => {
  const products = await classContenedor()
  const product = products[Math.floor(Math.random()*products.length)]
  res.status(200).json(product)
})


// connection
const server = app.listen(app.get('port'), ()=>{
  console.log(`Server ready\nVisit: http://localhost:${app.get('port')}`);
})

server.on('error', err => {
  console.log(err);
})