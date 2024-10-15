document.addEventListener('DOMContentLoaded',loaded);

fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
.then(res=> res.json())
.then(data=>{
    console.log(data)
    const userId=data.items[0].id
    localStorage.setItem(userId,JSON.stringify(data))
    displayData(userId,data)
})
.catch(err=>{
    console.log("something Error While Posting",err)
})

function displayData(userId, data) {
    localStorage.getItem(userId);
    const table = document.createElement("table");
    table.className = "product-details w-full h-auto mx-auto shadow-2xl  p-26 rounded-xl";
    table.innerHTML = `
    <thead class="shadow-lg rounded-lg  ">
       <tr class="">
          <th class="sm:w-1/12">Product</th>
          <th class="sm:w-1/12">Price</th>
          <th class="sm:w-1/12">Quantity</th>
          <th class="sm:w-1/12">Sub-Total</th>
          
       </tr>
    </thead>`;
    
    const tbody = document.createElement("tbody");
    data.items.forEach(item => {
        const row = document.createElement("tr");
        row.className = "item text-center"; // Optional: you can add a class for styling
        row.innerHTML = `
            <tr class="text-center">       
               <td>
                  <div class='product-info flex flex-col items-center'>
                    <img src="${item.image}" alt="${item.title}" class="w-full"><br>
                    ${item.title}
                  </div>
               </td>
               <td>${(item.price / 100).toFixed(2)}</td>
               <td><input type="number" value="${item.quantity}" min="1" class="quantity p-0 w-8" data-price="${item.price/100}" ></input></td>
               <td class="subtotal">${((item.price / 100) * item.quantity).toFixed(2)}</td>
               <td class="del-trash sm:w-1/12"><button class="trash p-1"><i class="fas fa-trash"></i></button></td>
            <tr>   
               
        `;
        tbody.appendChild(row);

        const quantity = row.querySelector('.quantity')
        const subtotal=row.querySelector(".subtotal")

        quantity.addEventListener('input',(event)=>{
            updateSubtotal(event.target,subtotal)
        })

        const trash=row.querySelector(".del-trash")
        trash.addEventListener("click",(event)=>{
            deleteData(event.target)
        })


    });
    table.appendChild(tbody);
    let section = document.querySelector('.cart-content');
    section.appendChild(table);
}

function updateSubtotal(input,subtotal) {
    const count=parseInt(input.value,10)
    const price=parseFloat(input.dataset.price)
    const total=(price*count).toFixed(2)
    subtotal.textContent=`${total}`
    cartTotalsDetails()
}

function cartTotalsDetails(){
    let subtotal=0
    const rows= document.querySelectorAll(".product-details tbody .item")
    rows.forEach(row=>{
        const quantity=row.querySelector(".quantity").value;
        const price=row.querySelector('.quantity').dataset.price;
        subtotal+=parseInt(quantity)*parseFloat(price)
    })

    document.getElementById("Sub-Totals").innerHTML=`Sub-Totals :₹${subtotal.toFixed(2)}`
    document.getElementById("Totals").innerHTML=`Total :₹${subtotal.toFixed(2)}`
}

function deleteData(target) {
    const row=target.closest('tr')
    row.remove()
    cartTotalsDetails()
}


function loaded(){
    for(let i=0;i<localStorage.length;i++){
        let key=localStorage.key(i)
        let data=JSON.parse(localStorage.getItem(key))
        console.log(key,data)

    }
}

function checkOut() {
    document.body.style.backgroundColor = 'pink';
    document.body.innerHTML = `
    <div class="greeting" style="color: white; text-align: center; margin-top: 50px; font-size: 24px;">
        <h1>Thank you for shopping!</h1>
    </div>`;

}



