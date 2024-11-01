$(document).ready(function() {
    // Initialize the deck of cards
    
    const cardUnicodeMap = {
        'S-A': '🂡', 'S-2': '🂢', 'S-3': '🂣', 'S-4': '🂤', 'S-5': '🂥', 'S-6': '🂦', 'S-7': '🂧', 'S-8': '🂨', 'S-9': '🂩', 'S-X': '🂪', 'S-J': '🂫', 'S-Q': '🂭', 'S-K': '🂮',
        'H-A': '🂱', 'H-2': '🂲', 'H-3': '🂳', 'H-4': '🂴', 'H-5': '🂵', 'H-6': '🂶', 'H-7': '🂷', 'H-8': '🂸', 'H-9': '🂹', 'H-X': '🂺', 'H-J': '🂻', 'H-Q': '🂽', 'H-K': '🂾',
        'D-A': '🃁', 'D-2': '🃂', 'D-3': '🃃', 'D-4': '🃄', 'D-5': '🃅', 'D-6': '🃆', 'D-7': '🃇', 'D-8': '🃈', 'D-9': '🃉', 'D-X': '🃊', 'D-J': '🃋', 'D-Q': '🃍', 'D-K': '🃎',
        'C-A': '🃑', 'C-2': '🃒', 'C-3': '🃓', 'C-4': '🃔', 'C-5': '🃕', 'C-6': '🃖', 'C-7': '🃗', 'C-8': '🃘', 'C-9': '🃙', 'C-X': '🃚', 'C-J': '🃛', 'C-Q': '🃝', 'C-K': '🃞'
    };

    let deck = [];

    getDBData('fetch_cards.php');

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
                $("<div>").addClass(cardArray[1]).text(cardArray[0]).appendTo(playerCard);
            });	
            
            $("#output").append(playerCard);
        });
    }

    //Function to get Card Suit - Rank from MySQL Database
    function getDBData(url) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function(data) {
                data.forEach(function(card) {
                    pattern = `${card.suit[0]}-${card.rank}`;

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
            },
            error: function(error) {
                console.log(JSON.stringify(error));
            }
        });
    }

    // Invoke distributeCards function which will perform the card shuffle / assignment logic
    $("#distribute").click(function () {
        const numPlayers = parseInt($("#players").val());
        distributeCards(numPlayers);
    });

});