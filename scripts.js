const booksDiv = document.getElementById('books');

fetch('https://striveschool-api.herokuapp.com/books')
  .then(response => response.json())
  .then(books => {

    const booksHTML = books.map(book => `

    <div class="col mb-5">
    <div class="card book h-100" >
        <!-- Product image-->
        <h5>${book.title}</h5>
        <img class="card-img-top" src="${book.img}" alt="${book.title}"/>
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <p>Author: ${book.author}</p>
                <p>Price: ${book.price} ${book.currency}</p>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center d-flex"><a class="btn btn-outline-dark addcart mt-auto pulsanti" href="#">Add to cart</a> <a class="btn btn-outline-dark salta mt-auto pulsanti" href="#">Salta</a> </div>
    </div>
    </div>

    </div>`
    );

    booksDiv.innerHTML = booksHTML.join('');

    const cartBadge = document.querySelector('.carrello .badge');
    const cartItems = document.querySelector('.cart-items');
    
    let cartItemCount = 0;
    const addCar =document.querySelectorAll('.addcart');
    addCar.forEach(btn=> {
        btn.addEventListener('click',(event) => {

            const cardElement = event.target.closest('.card');
            // Aggiungi il bordo verde alla carta selezionata
            cardElement.style.borderColor = 'green';
            // Incrementa il numero di libri nel carrello
            cartItemCount++;
            // Aggiorna il numero nel badge del carrello
            cartBadge.innerText = cartItemCount;
            // Ottieni i dettagli del libro
        });
    }) 

    const skipBtns = document.querySelectorAll('.salta');
    skipBtns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        card.classList.add('d-none');
      });
    });
  })
  
  .catch(error => console.error(error)); 

  filterInput.addEventListener('keyup', filterProducts);

  function filterProducts(){
    let filterValue = filterInput.value.toUpperCase();
    let item = document.querySelectorAll('.card')
    // console.log(filterValue);

    for (let i = 0; i < item.length; i++){
        let span = item[i].querySelector('.title');

        if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            item[i].style.display = "initial";
        }else{
            item[i].style.display = "none";
        }

    }
}
