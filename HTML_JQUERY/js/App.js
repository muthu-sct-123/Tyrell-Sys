$(document).ready(function () {
    // Initialize the deck of cards
    const suitsSymbol = ['♠', '♥', '♦', '♣']; //Not in use - For testing purpose only
    const suits = ['S', 'H', 'D', 'C'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'];
    const cardUnicodeMap = {
        'S-A': '🂡', 'S-2': '🂢', 'S-3': '🂣', 'S-4': '🂤', 'S-5': '🂥', 'S-6': '🂦', 'S-7': '🂧', 'S-8': '🂨', 'S-9': '🂩', 'S-X': '🂪', 'S-J': '🂫', 'S-Q': '🂭', 'S-K': '🂮',
        'H-A': '🂱', 'H-2': '🂲', 'H-3': '🂳', 'H-4': '🂴', 'H-5': '🂵', 'H-6': '🂶', 'H-7': '🂷', 'H-8': '🂸', 'H-9': '🂹', 'H-X': '🂺', 'H-J': '🂻', 'H-Q': '🂽', 'H-K': '🂾',
        'D-A': '🃁', 'D-2': '🃂', 'D-3': '🃃', 'D-4': '🃄', 'D-5': '🃅', 'D-6': '🃆', 'D-7': '🃇', 'D-8': '🃈', 'D-9': '🃉', 'D-X': '🃊', 'D-J': '🃋', 'D-Q': '🃍', 'D-K': '🃎',
        'C-A': '🃑', 'C-2': '🃒', 'C-3': '🃓', 'C-4': '🃔', 'C-5': '🃕', 'C-6': '🃖', 'C-7': '🃗', 'C-8': '🃘', 'C-9': '🃙', 'C-X': '🃚', 'C-J': '🃛', 'C-Q': '🃝', 'C-K': '🃞'
    };			
    let deck = [];

    // Generate suits-values pair
    suits.forEach(suit => {
        values.forEach(value => {
            pattern = `${suit}-${value}`;
            
            // Map cardUnicodeMap with the generated suits-values pair
            for (const [key, value] of Object.entries(cardUnicodeMap)) {
                if (key.includes(pattern) || String(value).includes(pattern)) {
                    // Assign class name - 'cardblack' for Spades (or) Clubs &
                    // class name - 'cardred' for Diamond (or) Hearts
                    if(key.includes('S') || key.includes('C')) {
                        deck.push(`${value}-cardblack`);
                    } else {
                        deck.push(`${value}-cardred`);
                    }
                }
            }
        });
    });

    // Shuffle the deck - Swapping the DeckCard Array
    function shuffle(deckCard) {
        //Loops through each card
        for (let i = 0; i < deckCard.length; i++) {
            // picks the random number between 0 and length of the deck
            const shuffleCard = Math.floor(Math.random() * (deckCard.length));

            //swap the current with a random position
            [ deckCard[i], deckCard[shuffleCard] ] = [ deckCard[shuffleCard], deckCard[i] ];
        }
    }

    // Function to distribute cards to players
    function distributeCards(numPlayers) {
        $("#output").empty(); // Clear previous output
        //Since the Card Deck only contains 52 cards, setting the maximum comparison value to 52
        if (numPlayers < 1 || numPlayers > 52) {
            alert("Number of players should be between 1 and 52.");
            return;
        }

        shuffle(deck);

        //Assign Empty Array of Cards to players
        const players = Array.from({ length: numPlayers }, () => []);

        // Populate Empty Array with Cards (Assigned to players based on Index)
        for (let i = 0; i < deck.length; i++) {
            players[i % numPlayers].push(deck[i]);
        }

        // HTML Output - Display the Player # along with the assigned cards
        players.forEach((player, index) => {
            const playerCard = $("<div>").addClass("player w3-pale-green w3-bottombar w3-border-green w3-border w3-round-large")
                .html(`&nbsp;<strong>Player ${index + 1}</strong><br/>`);
            
            // Assign Deck Card Array along with Class Name for each card 
            player.forEach(card => {
                const cardArray = card.split("-");
                $("<span>").addClass(cardArray[1]).text(cardArray[0]).appendTo(playerCard);
            });	
            
            $("#output").append(playerCard);
        });
    }

    // Invoke distributeCards function which will perform the card shuffle / assignment logic
    $("#distribute").click(function () {
        const numPlayers = parseInt($("#players").val());
        distributeCards(numPlayers);
    });
});