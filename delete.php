<?php

// Database connection parameters
$servername = "database-1.cqhx72a1yicb.us-east-1.rds.amazonaws.com";
$username = "admin"; 
$password = "UCFucf2024"; 
$dbname = "ucf_person"; 


// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve user input from the login form
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$idToDelete = $data['ID'];

if ($idToDelete === null) {
    die("Error: Invalid ID");
}

// SQL delete statement
$sql = "DELETE FROM ucf_person.Contacts WHERE ID = ?";
$stmt = $conn->prepare($sql);



// Bind parameter and execute the delete statement
$stmt->bind_param("i", $idToDelete);
$stmt->execute();

// Check if the execution was successful
if ($stmt->affected_rows > 0) {
    echo "Record deleted successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();

?>
