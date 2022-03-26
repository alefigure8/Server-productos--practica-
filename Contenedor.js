const fs = require('fs');

class Contenedor {

  async save(obj){
    const saveObj = {
      ...obj,
    };

    const prods = await readFS();
    const parseProd = JSON.parse(prods);

    if(prods && parseProd.length !== 0){
      saveObj.id = parseProd[parseProd.length - 1].id + 1;
      await writeFS(JSON.stringify([...parseProd, saveObj], null, 2));
    } else {
      saveObj.id = 1;
      const arr = new Array(saveObj);
      await writeFS(JSON.stringify(arr, null, 2));
    }

    return {id: saveObj.id, msg: 'Producto guardado'};

  }

  async getById(id){
      const prod = await readFS();
      const parseProd = JSON.parse(prod);

      if(prod){
        const isProd = parseProd.some(prod => prod.id === id);

        if(isProd){
          const prodId = parseProd.filter(prod => prod.id === id);
         return prodId;
        } else {
          return {msg: `No se encontró un producto con el id: ${id}`};
        }

      }

      return {msg: 'El archivo no se encontró. Por favor inicie uno utilizando el método "save"'};
  }

  async getAll(){
      const prods = await readFS();
      if(prods){
        const parseProds = JSON.parse(prods);
        return parseProds;
      }

      return {msg: 'El archivo no se encontró. Por favor inicie uno utilizando el método "save"'};
    }

  async deleteById(id){
      const prod = await readFS();
      const parseProd = JSON.parse(prod);

      if(prod){
        const isProd = parseProd.some(prod => prod.id === id);

        if(isProd){
          const deleteProd = parseProd.filter(prod => prod.id !== id);
          await writeFS(JSON.stringify(deleteProd, null, 2));
          return {msg: `Producto con id: ${id} fue eliminado`};
        } else {
          return {msg: `No se encontró un producto con el id: ${id}`};
        }

      }

    return 'El archivo no se encontró. Por favor inicie uno utilizando el método "save"';
  }

  async deleteAll(){
    try {
      await fs.promises.unlink('./products.txt');
      return 'Todos los elementos fueron borrados';
    } catch (err){
      throw new Error (err);
    }
  }

}


// Lee el archivo txt
async function readFS(){
  try {
    const data =  await fs.promises.readFile('./products.txt', 'utf-8');
    return data;
  } catch (err){
    return false;
  }
}

// Escribe el archivo txt
async function writeFS(data){
  try {
    await fs.promises.writeFile('./products.txt', data);
  } catch (err){
    throw new Error (err);
  }
}

module.exports = Contenedor;