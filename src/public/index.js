const socketClient = io()

const productsList = document.getElementById('productsList');

socketClient.on('products',(products)=>{
    const prods = products.map((prod)=>{
        return `<ul class="listaProducts">
                    <li>
                        <h1>
                            Producto: ${prod.title}    
                        </h1>
                        <h2>
                            Precio: ${prod.price}
                        </h2>
                        <h3>
                            Categoria: ${prod.category}
                        </h3>
                        <p>
                            Descripcion: ${prod.description}
                        </p>
                        <p>
                            Codigo: ${prod.code}
                        </p>
                        <p>
                            Estado: ${prod.status}
                        </p>
                        <p>
                            Id: ${prod.id ? prod.id : prod._id}
                        </p>
                    </li>
                </ul>`
    });
    productsList.innerHTML = prods 
});
