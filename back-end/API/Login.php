<?php
$allowedOrigin = '*';
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // You can also add more specific conditions here if needed
    $allowedOrigin = $_SERVER['HTTP_ORIGIN'];
}
header("Access-Control-Allow-Origin: $allowedOrigin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');    // cache for 1 day

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
        $inData = getRequestInfo();
        
        $id = 0;
        $firstName = "";
        $lastName = "";

        $conn = new mysqli("database-1.cqhx72a1yicb.us-east-1.rds.amazonaws.com", "admin", "UCFucf2024", "ucf_person");        
        if( $conn->connect_error )
        {
                returnWithError( $conn->connect_error );
        }
        else
        {
                $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
                $stmt->bind_param("ss", $inData["login"], $inData["password"]);
                $stmt->execute();
                $result = $stmt->get_result();

                if( $row = $result->fetch_assoc()  )
                {
                        returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
                }
                else
                {
                        returnWithError("No Records Found");
                }

                $stmt->close();
                $conn->close();
        }
        
        function getRequestInfo()
        {
                return json_decode(file_get_contents('php://input'), true);
        }

        function sendResultInfoAsJson( $obj )
        {
                header('Content-type: application/json');
                echo $obj;
        }
        
        function returnWithError( $err )
        {
                $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
                sendResultInfoAsJson( $retValue );
        }
        
        function returnWithInfo( $firstName, $lastName, $id )
        {
                $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
                sendResultInfoAsJson( $retValue );
        }
        
?>
