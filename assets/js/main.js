 import Game from "./game.module.js";
import { displayGames } from './ui.module.js';
import { DetailedGame  } from './detailedGame.module.js';

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav li');
    fetchAndDisplayGames("mmorpg");

    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const category = e.target.getAttribute('data-category');
            
            if (!category) {
                console.error("No category found for the clicked link.");
                return;
            }

            // console.log("Selected category:", category);
            await fetchAndDisplayGames(category);
        });
    });
});

async function fetchAndDisplayGames(category) {
    // Show the spinner before fetching data
    showSpinner();

    // Fetch the games
    const games = await fetchGames(category);

    // Wait for 1 second (simulate loading) and then hide the spinner and display the games
    setTimeout(() => {
        hideSpinner(); // Hide the spinner
        displayGames(games); // Display the games in the UI
        // console.log(games);
    }, 500); // 1000ms = 1 second delay
}

async function fetchGames(category) {
    console.log("Fetching games for:", category);
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9b9d926fc6mshcc59e9a470e42f3p1cda1ajsn7c0dc979275c',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const response = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
            options
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.map(game => new Game(
            game.title,
            game.short_description,
            game.genre,
            game.platform,
            game.thumbnail,
            game.id
        ));

    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// Function to show the spinner
export function showSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'flex'; // Show the spinner
    }
}

// Function to hide the spinner
export function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'none'; // Hide the spinner
    }
}

/*   new request for get details of a game */
export async function fetchDetailedGames(id) {
    console.log("Fetching detailes of games for:", id);
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9b9d926fc6mshcc59e9a470e42f3p1cda1ajsn7c0dc979275c',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const response = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
            options
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const gameDetails = await response.json();

        return {
            title: gameDetails.title,
            description: gameDetails.description,
            genre: gameDetails.genre,
            platform: gameDetails.platform,
            thumbnail: gameDetails.thumbnail,
            game_url:gameDetails.game_url,
            status:gameDetails.status
        };

    } catch (error) {
        console.error("Error fetching detailes of games:", error);
        return [];
    }
}

