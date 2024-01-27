

// let baseUrlLocal = 'https://192.168.100.155:8010/'
let baseUrlLocal = 'https://localhost:8010/'

// const currentUrl = window.location.href;
// if (currentUrl.startsWith(baseUrlLocal)) {
//     baseUrlLocal = baseUrlLocal;
// } else {
//     baseUrlLocal = baseUrlHeroku;
// }



const getOrdersUrl = `${baseUrlLocal}api/get-order-done`;
fetch(getOrdersUrl)
    .then((res) => res.json())
    .then(orders => {
        console.log(orders)
        for (const order of orders) {
            addOrder(order);
        }
    });




//MANAGE ORDERS WHEN ARE ARIVE FROM DB

const newOrdersDiv = document.getElementById("new-orders");


function addOrder(order) {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', "mb-4", 'order', "appear");

    const date = new Date(order.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const localTimeString = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");


    const productList = order.products.map(product => `<li class="list-group-item">
    <div class="product-wrapper">
    <span class='prod-name'>${product.quantity} X ${product.name}</span>
    </div>
    <div>
    <span class='bold toppings'>${product.toppings.map(topping => ` + ${topping.name}`).join('<br>')}</span>
    </div>
    </li>`).join('');

    orderDiv.innerHTML = `

    <ul class="list-group">
    <div class="hide-wrapper">
    <i class="bi bi-eye-slash"></i>
    <span class="hide-text">Arata</span>
    </div>

    <li class="list-group-item">
    <div class="wrapper">
    <span class="bold">Name: ${order.employee.fullName}</span>
    </div>
    </li>

    </li>
    <li class="list-group-item">
    <div class="wrapper">
    <div> <span>Primită: </span><span class="bold">${localTimeString}</span></div>
    <span class="bold" id="table">Masa: ${order.masa}</span>
    </div>
    </li>

    <li class="list-group-item hide order-id">${order._id}</li>
    
    <ul class="list-group to-hide">${productList}</ul>
    

     </ul>`;

    const hideOrderButton = orderDiv.querySelector('.hide-wrapper');
    const hideIcon = orderDiv.querySelector('i')
    const hideText = orderDiv.querySelector('.hide-text');
    const elementsToHide = orderDiv.querySelectorAll('.to-hide');


    hideOrderButton.classList.remove('hide');
    elementsToHide.forEach((el) => {
        el.classList.add('hide')
    });
    showHideElements(hideOrderButton, hideIcon, hideText, elementsToHide);
    newOrdersDiv.appendChild(orderDiv);
}


function showHideElements(hideOrderButton, hideIcon, hideText, elementsToHide) {
    hideOrderButton.addEventListener('click', () => {
        if (hideText.innerText === 'Ascunde') {
            hideIcon.classList.remove('bi-eye');
            hideIcon.classList.add('bi-eye-slash');
            hideText.innerText = 'Arată';
            hideOrderButton.classList.remove('actives')
            elementsToHide.forEach((el) => {
                el.classList.add('hide')
            })
        } else {
            hideIcon.classList.remove('bi-eye-slash');
            hideIcon.classList.add('bi-eye');
            hideText.innerText = 'Ascunde';
            hideOrderButton.classList.add('actives')
            elementsToHide.forEach((el) => {
                el.classList.remove('hide')
            })
        }

    })
}










