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

$name = $data['NAME'];
$phone = $data['PHONE'];
$email = $data['EMAIL'];
$userid = $data['USERID'];

// Debugging: Echo the received data
echo "Received JSON data: " . print_r($data, true) . PHP_EOL;
// SQL insert statement with prepared statements
$sql = "INSERT INTO ucf_person.Contacts (NAME, PHONE, EMAIL, USERID) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Check if the prepared statement is successful
if ($stmt === FALSE) {
    die("Error: " . $conn->error);
}

// Bind parameters and execute the insert statement
$stmt->bind_param("sssi", $name, $phone, $email, $userid);
$stmt->execute();

// Check if the execution was successful
if ($stmt->affected_rows > 0) {
    echo "Record inserted successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();

?>