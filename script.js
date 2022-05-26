let data = null;
let pageCardsNumber = 30;
let currentPage = 1;
let pagination = document.getElementsByClassName('page_container')[0];

function renderCard(data, currentPage){
    let wrapper = document.getElementsByClassName('wrapper')[0];
    let skip = pageCardsNumber * (currentPage - 1)
    
    //delete old cards
    const oldCards = document.getElementsByClassName('line_div');
    while(oldCards.length > 0){
        oldCards[0].parentNode.removeChild(oldCards[0]);
    }

    //Create new Cards;
    for(let j = 0; j < 8; j++){

        let lineDiv = document.createElement('div');
        lineDiv.className = 'line_div';

        for(let i = 0; i < 4; i++){
            let cardImg = document.createElement('img'); // 1
            cardImg.className = 'card-img-top';
            cardImg.setAttribute(`src`, `${data[skip].thumbnailUrl}`);
        
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.innerHTML = `${data[skip].title}`;
        
            let cardTitleDiv = document.createElement('div'); // 2
            cardTitleDiv.className = 'card-body';
            cardTitleDiv.appendChild(cardTitle);
        
            let albumId = document.createElement('li');
            albumId.className = 'list-group-item';
            albumId.innerHTML = `Album Id: <b>${data[skip].albumId}</b>`;
        
            let cardId = document.createElement('li');
            cardId.className = 'list-group-item';
            cardId.innerHTML = `Id: <b>${data[skip].id}</b>`
        
            let cardUl = document.createElement('ul'); // 3
            cardUl.className = 'list-group list-group-flush';
            cardUl.appendChild(cardId);
            cardUl.appendChild(albumId);
        
            let carLink = document.createElement('a');
            carLink.className = 'btn btn-primary';
            carLink.setAttribute(`href`, `${data[skip].url}`)
            carLink.innerHTML = 'Card link';
        
            let carLinkDiv = document.createElement('div'); // 4
            carLinkDiv.className = 'card-body';
            carLinkDiv.appendChild(carLink);
        
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.setAttribute('style', 'width: 18rem;');
        
            cardDiv.appendChild(cardImg);
            cardDiv.appendChild(cardTitleDiv);
            cardDiv.appendChild(cardUl);
            cardDiv.appendChild(carLinkDiv);
    
            
            lineDiv.appendChild(cardDiv);
            
            skip++;
        };

        pagination.before(lineDiv);
    };


};


function renderPage(data){

};


fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => {
        response.json().then(users => {
           data = users;
           renderCard(data, currentPage);
           pagination.addEventListener('click', (e) => {
            
            switch(e.target.id){
                case 'PreviousPage': (currentPage - 1) == 0 ? currentPage = 1 : currentPage-- ; break;
                case 'NextPage': (currentPage + 1) == 5 ? currentPage = 4 : currentPage++ ; break;
                case 'p1' : currentPage = 1; break;
                case 'p2' : currentPage = 2; break;
                case 'p3' : currentPage = 3; break;
                case 'p4' : currentPage = 4; break;
            };
            
            renderCard(data, currentPage);
            let buttons = document.querySelectorAll('li.page-item');
            for(let i = 0; i < buttons.length; i++){
                buttons[i].classList.remove('active')
            };
        
            switch(currentPage){
                case 1 : document.getElementById('p1').parentNode.classList.add('active'); break;
                case 2 : document.getElementById('p2').parentNode.classList.add('active'); break;
                case 3 : document.getElementById('p3').parentNode.classList.add('active'); break;
                case 4 : document.getElementById('p4').parentNode.classList.add('active'); break;
            };
        
        });
           
        })
    })
    .catch(reason => {
        console.log(reason)
    });

    
