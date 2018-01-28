<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     
     require "conndb.php";
     $sql = "   SELECT * FROM problem 
                WHERE status = 'ยังไม่ได้แก้'";
 
     $result = mysqli_query($conn,$sql);
 
     $arr = array();
     while($row = mysqli_fetch_assoc($result))
     {
         $arr[]=$row;
     }
     echo json_encode($arr);
    
?>