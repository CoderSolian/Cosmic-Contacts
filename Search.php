<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
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
    
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("database-1.cqhx72a1yicb.us-east-1.rds.amazonaws.com", "admin", "UCFucf2024", "ucf_person");
    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $searchTerm = "%" . $inData["search"] . "%";
        
        // You can adjust the query based on the fields you want to search
        $stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? OR Phone LIKE ? OR Email LIKE ?");
        $stmt->bind_param("ssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        while ($row = $result->fetch_assoc())
        {
            if ($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= json_encode($row);
        }
        
        if ($searchCount == 0)
        {
            returnWithError("No Records Found");
        }
        else
        {
            returnWithInfo($searchResults);
        }
        
        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"results":[],"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
