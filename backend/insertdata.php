<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     $data = json_decode(file_get_contents('php://input'), true);
    
     $id = $data['id'];
     $username = $data['username'];
     $password = $data['password'];
     
    require "conndb.php";
    $sql = "INSERT INTO user VALUES($id, '$username', '$password')";
    $result = mysqli_query($conn,$sql);

    if($result === true) {
        echo '{"status":"ok","message":"บันทึกข้อมูลสำเร็จ"}';
    } 
?>