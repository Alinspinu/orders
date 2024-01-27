

// let baseUrlLocal = 'https://172.20.110.62:8090/'
let baseUrlLocal = 'https://192.168.100.155:8010/'

// const currentUrl = window.location.href;
// if (currentUrl.startsWith(baseUrlLocal)) {
//     baseUrlLocal = baseUrlLocal;
// } else {
//     baseUrlLocal = baseUrlHeroku;
// }


const url = `${baseUrlLocal}api/recive-order`;
const urlLocalSend = `${baseUrlLocal}api/order-done`;
const eventSource = new EventSource(url);

eventSource.onopen = () => {
    console.log('EventSource connection is open.');
};

eventSource.onmessage = (event) => {
    const order = JSON.parse(event.data);
    if (!order || order.message === 'No Orders') {
        console.log('hit the no orders')
    } else {
        addOrder(order, true);
    }
};

eventSource.onerror = (event) => {
    console.error('Error occurred with the EventSource connection:', event);
};

const getOrdersUrl = `${baseUrlLocal}api/get-order`;
fetch(getOrdersUrl)
    .then((res) => res.json())
    .then(orders => {
        for (const order of orders) {
            addOrder(order);
        }
    });

const dingSound = new Audio(`${baseUrlLocal}sounds/ding.mp3`);


//MANAGE ORDERS WHEN ARE ARIVE FROM DB

const newOrdersDiv = document.getElementById("new-orders");



newOrdersDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("accept")) {
        const btnsTer = event.target;
        const orderId = btnsTer.closest(".list-group").querySelector(".order-id").textContent;
        fetch(`${urlLocalSend}?cmdId=${orderId}`).then(response => console.log(response));
        const elementToRemove = btnsTer.parentNode.parentNode
        if (elementToRemove.parentNode) {
            elementToRemove.parentNode.removeChild(elementToRemove)
        }
    }
});


function addOrder(order, withding) {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', "mb-4", 'order', "appear");

    const date = new Date(order.updatedAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const localTimeString = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
    
    let bucProducts = []

    order.products.forEach(product => {
        if(product.printer === "kitchen" && product.sentToPrintOnline){
            bucProducts.push(product)
        }
    })
    console.log(order)
    const productList = bucProducts.map(product => `<li class="list-group-item product-li">
    <div class="product-name-wrapper">
        <span class='prod-name bold'>${product.quantity} X ${product.name} </span>
    </div>
    ${product.toppings.length || product.comment.length ? `<div class="toppings-wrapper">
        ${product.toppings.map(topping => ` + ${topping.name}`).join('<br> ')}
        <br>
        <span class='prod-name bold'>${product.comment}</span>
    </div>` : ''}
   
    <div class='hide ings-wrapper' id="ings-wrapper">
        <img class="product-img" src="${product.imgPath.split('upload')[0] + 'upload/c_fill,w_555,h_555' + product.imgPath.split('upload')[1]}">
        ${product.ings.map(ing => `
            <span class='ing'>${ing.ing.name} X ${ing.qty} ${ing.ing.um}</span>
        `).join('')}
    </div>
</li>`).join('');

    orderDiv.innerHTML = `

    <ul class="list-group">
    <div class="hide-wrapper hide">
    <i class="bi bi-eye"></i>
    <span class="hide-text">Ascunde</span>
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
    
    <li class="list-group-item to-hide gap"></li>
    <button class="btn pending btn-danger">Accepta</button>
    <button class="btn accept hide btn-success">Terminat</button>
     </ul>`;

    const toppings = orderDiv.querySelectorAll('.toppings')
    const acceptaButton = orderDiv.querySelector('.pending');
    const terminatButton = orderDiv.querySelector('.accept');
    const productShow = orderDiv.querySelectorAll('.product-li')
    const hideOrderButton = orderDiv.querySelector('.hide-wrapper');
    const hideIcon = orderDiv.querySelector('i')
    const hideText = orderDiv.querySelector('.hide-text');
    const elementsToHide = orderDiv.querySelectorAll('.to-hide');


    if(toppings.length){
        toppings.forEach(el => {
            if(el.innerText === '+'){
                el.classList.add('hide')
            }
        })
    }

    if (withding) {
        //SET INTERVAL FOR ANIMATION
        const intervalId = setInterval(() => {
            orderDiv.classList.add('appear');
            setTimeout(() => {
                orderDiv.classList.remove('appear');
            }, 1000); // Hide the div after 1 second
        }, 1500);

        dingSound.addEventListener('ended', () => {
            dingSound.currentTime = 0;
            dingSound.play();
        });

        dingSound.play();
   

        
        acceptaButton.addEventListener('click', () => {
                clearInterval(intervalId);
                dingSound.pause();
                dingSound.currentTime = 0;
                orderDiv.classList.remove('appear');
                acceptaButton.classList.remove('pending');
                acceptaButton.classList.add('hide');
                terminatButton.classList.remove('hide');
     
        });
        showHideElements(hideOrderButton, hideIcon, hideText, elementsToHide);
        newOrdersDiv.appendChild(orderDiv);
    } else {
        hideOrderButton.classList.remove('hide');
        showHideElements(hideOrderButton, hideIcon, hideText, elementsToHide);
        const acceptaButton = orderDiv.querySelector('.pending');
        acceptaButton.classList.add('hide');
        const terminatButton = orderDiv.querySelector('.accept');
        terminatButton.classList.remove('hide');
        newOrdersDiv.appendChild(orderDiv);
    }
   
    productShow.forEach(el => {
        el.addEventListener('click', (event) => {
            const ingredients = el.querySelector(".ings-wrapper")
           if(ingredients){
            ingredients.classList.toggle('hide')
           }
        })
    }) 

}





function showHideElements(hideOrderButton, hideIcon, hideText, elementsToHide) {
    hideOrderButton.addEventListener('click', () => {
        if (hideText.innerText === 'Ascunde') {
            hideIcon.classList.remove('bi-eye');
            hideIcon.classList.add('bi-eye-slash');
            hideText.innerText = 'Arată';
            elementsToHide.forEach((el) => {
                el.classList.add('hide')
            })
        } else {
            hideIcon.classList.remove('bi-eye-slash');
            hideIcon.classList.add('bi-eye');
            hideText.innerText = 'Ascunde';
            elementsToHide.forEach((el) => {
                el.classList.remove('hide')
            })
        }

    })
}










