const App = () => {
    //Assign React State Hooks
    const [numPlayers, setNumPlayers] = React.useState('');
    const [distribution, setDistribution] = React.useState([]);
    const [error, setError] = React.useState('');

    const cardUnicodeMap = {
        'S-A': '🂡', 'S-2': '🂢', 'S-3': '🂣', 'S-4': '🂤', 'S-5': '🂥', 'S-6': '🂦', 'S-7': '🂧', 'S-8': '🂨', 'S-9': '🂩', 'S-X': '🂪', 'S-J': '🂫', 'S-Q': '🂭', 'S-K': '🂮',
        'H-A': '🂱', 'H-2': '🂲', 'H-3': '🂳', 'H-4': '🂴', 'H-5': '🂵', 'H-6': '🂶', 'H-7': '🂷', 'H-8': '🂸', 'H-9': '🂹', 'H-X': '🂺', 'H-J': '🂻', 'H-Q': '🂽', 'H-K': '🂾',
        'D-A': '🃁', 'D-2': '🃂', 'D-3': '🃃', 'D-4': '🃄', 'D-5': '🃅', 'D-6': '🃆', 'D-7': '🃇', 'D-8': '🃈', 'D-9': '🃉', 'D-X': '🃊', 'D-J': '🃋', 'D-Q': '🃍', 'D-K': '🃎',
        'C-A': '🃑', 'C-2': '🃒', 'C-3': '🃓', 'C-4': '🃔', 'C-5': '🃕', 'C-6': '🃖', 'C-7': '🃗', 'C-8': '🃘', 'C-9': '🃙', 'C-X': '🃚', 'C-J': '🃛', 'C-Q': '🃝', 'C-K': '🃞'
    };

    // Fetches the ordered deck of cards from the server
    const fetchDeck = async() => {
        try {
            //Fetch Data from Server - jQuery Ajax Call
            const cards = await $.ajax({
                url: 'fetch_cards.php',
                type: 'GET',
                dataType: 'json'
            });
            return cards;
        } catch (error) {
            console.error("Error - Unable to fetch cards from server: " + error);
        }
    };

    // Shuffle the deck - Swapping the DeckCard Array
    const shuffleDeck = (deck) => {
        //Loops through each card
        for (let i = 0; i < deck.length; i++) {            
            // picks the random number between 0 and length of the deck
            const shuffleCard = Math.floor(Math.random() * (i + 1));

            //swap the current with a random position
            [ deck[i], deck[shuffleCard] ] = [ deck[shuffleCard], deck[i] ];
        }
        return deck;
    };

    // Distributes the cards among the specified number of people
    const distributeCards = (deck, numPlayers) => {
        //Assign Empty Array of Cards to players
        const players = Array.from({ length: numPlayers }, () => []);

        // Populate Empty Array with Cards (Assigned to players based on Index)
        for (let i = 0; i < deck.length; i++) {
            players[i % numPlayers].push(deck[i]);
        }
        return players.map(personCards => personCards.join(', '));
    };

    // Handles form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setDistribution([]);

        // Validate input
        if (numPlayers < 1 || numPlayers > 52) {
            alert("Number of players should be between 1 and 52.");
            return;
        }

        // Fetch, shuffle, and distribute the deck
        const cardDeck = await fetchDeck();

        let deck = [];
        cardDeck.forEach(function(card) {
            var pattern = `${card.suit[0]}-${card.rank}`;

            for (const [key, value] of Object.entries(cardUnicodeMap)) {
                if (key.includes(pattern) || String(value).includes(pattern)) {
                    if(key.includes('S') || key.includes('C')) {
                        deck.push(`${value}-cardblack`);
                    } else {
                        deck.push(`${value}-cardred`);
                    }
                }
            }
        });

        if (deck) {
            const shuffledDeck = shuffleDeck(deck);
            const distributedCards = distributeCards(shuffledDeck, parseInt(numPlayers));
            setDistribution(distributedCards);
        }
    };

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="players">Number of players:</label>&nbsp;
                <input type="number" id="numPlayers" value={numPlayers} min="1" onChange={(e) => setNumPlayers(e.target.value)} />&nbsp;
                <button id="distribute">Distribute Cards</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                {distribution.map((cards, index) => (         
                    <div key={index} className="player w3-pale-green w3-bottombar w3-border-green w3-border w3-round-large">
                        <strong>Player {index + 1}</strong>: <br/> 
                            {cards.split(', ').map((card, i) => {
                                var [cardName, className] = card.split('-');
                                return (
                                    <div key={i} className={className}>{cardName}</div>
                                );
                            })}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Render the App component
const container = document.getElementById('output');
const output = ReactDOM.createRoot(container);
output.render(<App />);