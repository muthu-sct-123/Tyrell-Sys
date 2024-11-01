<?php

//Database Configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "card_game";

//Create DB Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//Fetch all cards
$sql = "SELECT suit, rank FROM cards";
$result = $conn->query($sql);

$cards = [];
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $cards[] = $row;
    }
} else {
    echo json_encode(["error" => "No cards found"]);
    exit;
}

// Return cards as JSON
echo json_encode($cards);

$conn->close();

?>