<?php

class CardGame {
    private $deck;
    private $suits = ["S♠", "H♥", "D♦", "C♣"];
    private $values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    public function __construct() {
        $this->deck = $this->createDeck();
        $this->shuffleDeck();
    }

    // Step 1: Create a 52-card deck
    private function createDeck() {
        $deck = [];
        foreach ($this->suits as $suit) {
            foreach ($this->values as $value) {
                $deck[] = ["suit" => $suit, "value" => $value];
            }
        }
        return $deck;
    }

    // Step 2: Shuffle the deck
    private function shuffleDeck() {
        shuffle($this->deck);
    }

    // Step 3: Deal a single card
    public function dealCard() {
        return array_pop($this->deck);
    }

    // Step 4: Basic gameplay logic (deal cards to players)
    public function playGame($numPlayers = 4) {
        $players = array_fill(0, $numPlayers, []);
        
        // Deal 5 cards to each player
        for ($i = 0; $i < 11; $i++) {
            foreach ($players as &$player) {
                $player[] = $this->dealCard();
            }
        }
        
        return $players;
    }
}

// Initialize the game
$game = new CardGame();

// Deal cards to 2 players and display the hands
$players = $game->playGame();
foreach ($players as $index => $hand) {
    echo "Player " . ($index + 1) . " hand:\n";
    foreach ($hand as $card) {
        echo $card['value'] . $card['suit'] . "\n";
    }
    echo "<br>";
}

?>