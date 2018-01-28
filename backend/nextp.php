<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
    header("Content-Type: application/json;charset=utf-8");
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
     
    require "conndb.php";
    $sql = " UPDATE problem
             SET status = 'แก้ไขแล้ว'
             WHERE id = '$id'";

    $result = mysqli_query($conn,$sql);

    
    echo '{"status":"ok"}';
    
?>