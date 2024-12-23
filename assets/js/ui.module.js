import {fetchDetailedGames,hideSpinner,showSpinner} from "./main.js"
export function displayGames(games) {
    const output = document.querySelector('#gameData');
    if (!output) {
        console.error('Output element not found in the DOM.');
        return;
    }

    output.innerHTML = ''; // Clear previous content

    if (games.length > 0) {
        games.forEach(game => {
            let description = game.desc.split(" ").splice(0,10).join(",");
            // console.log(description);
            
            const cardHTML = `
                <div class="col">
                    <div class="card h-100 bg-transparent" role="button" data-id="${game.id}">
                        <div class="card-body">
                            <figure class="position-relative">
                                <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}" alt="${game.title}">
                            </figure>
                            <figcaption>
                                <div class="hstack justify-content-between">
                                    <h3 class="h6 small text-white">${game.title}</h3>
                                    <span class="badge text-bg-primary p-2">Free</span>
                                </div>
                                <p class="text-gray small text-center opacity-50">
                                    ${description}
                                </p>
                            </figcaption>
                        </div>
                        <footer class="card-footer small hstack justify-content-between">
                            <span class="badge badge-color p-2">${game.genre}</span>
                            <span class="badge badge-color p-2">${game.platform}</span>

                        </footer>
                    </div>
                </div>
            `;
            output.insertAdjacentHTML('beforeend', cardHTML);
             
        });
            // Attach event listeners to each card for detailed view
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', async (e) => {
                const gameId = card.getAttribute('data-id');
                showSpinner();
                if (gameId) {
                    const detailedGame = await fetchDetailedGames(gameId);
                     setTimeout(() => {
                            hideSpinner(); // Hide the spinner
                              // Display the games in the UI
                            displayGameDetails(detailedGame); // console.log(games);
                        }, 500);
                }
            });
        });
    } else {
        output.innerHTML = '<p>No games available for this category.</p>';
    }

  
}

export function displayGameDetails(game) {
    const output = document.querySelector('#detailsContent');
    const detailsContainer = document.querySelector('#details');
    const homepageContainer = document.querySelector('#home');
    if (!output) {
        console.error('Output element not found in the DOM.');
        return;
    }
    homepageContainer.style.display = 'none';
    detailsContainer.style.display ='block';
    output.innerHTML = `
        <div class="col-md-4">
         <img src="${game.thumbnail}" class="w-100" alt="image details">
        </div>
        <div class="col-md-8">
           <h3 class="text-white">Title: ${game.title}</h3>
           <p class="text-white">Category: <span class="badge text-bg-info"> ${game.genre}</span> </p>
           <p class="text-white">Platform: <span class="badge text-bg-info"> ${game.platform}</span> </p>
           <p class="text-white">Status: <span class="badge text-bg-info"> ${game.status}</span> </p>
           <p class="small text-white">${game.description}</p>
           <a class="btn btn-outline-warning" target="_blank" href="${game.game_url}">Show Game</a>
        </div>
    `;

    document.querySelector('#btnClose').addEventListener('click', () => {
        detailsContainer.style.display = 'none'; // Hide details
        homepageContainer.style.display = 'block'; // Show homepage
    });
     
}

/*
<section class="details">
         <div class="container">
           
            <div class="row g-4" id="detailsContent">
      <div class="col-md-4">
      <img src="https://www.freetogame.com/g/540/thumbnail.jpg" class="w-100" alt="image details">
   </div>
   <div class="col-md-8">
      <h3>Title: Overwatch 2</h3>
      <p>Category: <span class="badge text-bg-info"> Shooter</span> </p>
      <p>Platform: <span class="badge text-bg-info"> Windows</span> </p>
      <p>Status: <span class="badge text-bg-info"> Live</span> </p>
      <p class="small">The tale of the hero organization Overwatch continues in Overwatch 2. This new take on the popular team shooter changes up things a little with five-man teams, redefined classes, and new playable characters. With the adjustment to 5v5, players now have more individual impact than in the previous game.

Challenge yourself in all-new modes. Take control of a robot with your team in Push and take it to the enemy base before the enemy can take it from you. Explore all new areas, including iconic real-world cities such as New York, Rome, Monte Carlo, Toronto, and more.

Overwatch 2 features an update schedule that drops new content every nine weeks. It also boasts a regular battle pass – both free and premium. This is where some of the game’s characters will be obtained.</p>
      <a class="btn btn-outline-warning" target="_blank" href="https://www.freetogame.com/open/overwatch-2">Show Game</a>
   </div>
      
      </div>
         </div>
      </section> */
