<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     
     $data = json_decode(file_get_contents('php://input'), true);
     $username = $data['username'];
     $password = $data['password'];
       
    require "conndb.php";
    $sql = "SELECT * FROM employee WHERE username='$username' and password='$password'";

        $result = mysqli_query($conn,$sql);
      
     
        $arr = array();
        while($row = mysqli_fetch_assoc($result))
        {
                $arr[]=$row;
        }
      
        if($arr) {
                echo '{"status":"ok","message":"ok","username":"'.$username.'","password":"'.$password.'"}';
        
        }else{
                echo '{"status":"null","message":"Username หรือ password ไม่ถูกต้อง"}';
        }
?>



    
