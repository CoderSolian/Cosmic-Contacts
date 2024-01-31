<?php

// Database connection parameters
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


// Sample data to be updated
$idToUpdate = $data['ID'];
$newName = $data['NAME'];
$newEmail = $data['EMAIL'];
$newPhone = $data['PHONE'];
$newUserID = $data['USERID'];

// SQL update statement with prepared statements
$sql = "UPDATE ucf_person.Contacts SET NAME = ?, EMAIL = ?, PHONE = ?, USERID = ? WHERE ID = ?";
$stmt = $conn->prepare($sql);

// Check if the prepared statement is successful
if ($stmt === FALSE) {
    die("Error preparing statement: " . $conn->error);
}

// Bind parameters and execute the update statement
$stmt->bind_param("sssii", $newName, $newEmail, $newPhone, $userid, $idToUpdate);
$stmt->execute();

// Check if the execution was successful
if ($stmt->affected_rows > 0) {
    echo "Record updated successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();

?>
