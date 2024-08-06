// Obtener productos del localStorage o inicializar el carrito vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cargar los productos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Añadir evento a todos los botones de 'Añadir al Carrito'
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Cargar productos en la página del carrito
    if (document.getElementById('cart-items')) {
        loadCart();
    }
});

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const product = getProductById(productId);

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
}

function getProductById(id) {
    // Información de los productos (incluyendo la imagen)
    const products = [
        { id: '1', name: 'COOLER AMD WRAITH STEALTH', price: 100, image: 'imagenes/producto1.jpg' },
        { id: '2', name: 'AMD RYZEN 7 5700X', price: 120, image: 'imagenes/producto2.jpg' },
        { id: '3', name: 'MSI GEFORCE RTX 4060', price: 150, image: 'imagenes/producto3.jpg' },
        { id: '4', name: 'ASROCK B450M/AC R2.0', price: 90, image: 'imagenes/producto4.jpg' },
        { id: '5', name: 'ADATA XPG GAMMIX S70 BLADE 4TB', price: 300, image: 'imagenes/producto5.jpg' },
        { id: '6', name: 'ARCTIC LIQUID FREEZER III', price: 130, image: 'imagenes/producto6.jpg' },
        { id: '7', name: 'XPG FUSION 1600W', price: 650, image: 'imagenes/producto7.jpg' },
        { id: '8', name: 'CASE ANTEC CANNON', price: 80, image: 'imagenes/producto8.jpg' },
        { id: '9', name: 'KINGSTON FURY BEAST 32GB', price: 110, image: 'imagenes/producto9.jpg' },
        { id: '10', name: 'ZOTAC GAMING GTX 1660', price: 180, image: 'imagenes/producto10.jpg' }
    ];

    return products.find(product => product.id === id);
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Precio: $${item.price}</p>
                <input type="number" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
                <p>Total: $${item.price * item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal();

    // Añadir eventos a los inputs de cantidad y botones de eliminar
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function updateQuantity(event) {
    const input = event.target;
    const newQuantity = parseInt(input.value);
    const productId = input.getAttribute('data-id');

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = newQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');

    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateCartTotal() {
    const totalContainer = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalContainer.textContent = `Total: $${total}`;
}

function checkout() {
    alert('Procesando pago...');

    // Mostrar mensaje de éxito
    if (cart.length === 1) {
        alert('Producto pagado con éxito');
    } else if (cart.length > 1) {
        alert('Productos pagados con éxito');
    }

    // Limpiar el carrito
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}