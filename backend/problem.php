<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     
     $data = json_decode(file_get_contents('php://input'), true);
     $imgp = $data['imgp'];
     $villageid = $data['villageid'];
     $prob = $data['prob'];
       
     require "conndb.php";
     
     $sql = "INSERT INTO problem (house_id,img,problem,status) 
             VALUES('$villageid','$imgp','$prob','ยังไม่ได้แก้')";

            $result = mysqli_query($conn,$sql);

            $arr = array();
            while($row = mysqli_fetch_assoc($result))
                {
                    $arr[]=$row;
                }
                echo json_encode($arr);

?>