<?php
    require "conndb.php";
    $sql = "SELECT * FROM user";
    $result = mysqli_query($conn,$sql);

    $row = mysqli_fetch_array($result);
    echo $row['username'];

    $jdata = array( "id"=>$row['id'],
                    "usernsme"=>$row['username'],
                    "password"=>$row['password'], );
                    
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header("Content-Type: application/json;charset=utf-8");
    $data = json_encode($jdata,JSON_UNESCAPED_UNICODE);

    print_r ($data);

?>