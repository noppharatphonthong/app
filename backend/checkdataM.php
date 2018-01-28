<?php
       header('Content-Type: application/json');
       header('Access-Control-Allow-Origin: *');
       header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
       header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
       header("Content-Type: application/json;charset=utf-8");
       
       $data = json_decode(file_get_contents('php://input'), true);
       $address = $data['address'];
       $villageno = $data['villageno'];
        
       require "conndb.php";
       $sql = "SELECT house.*,customer.*,money_management.* FROM (house 
               INNER JOIN customer 
               ON customer.customer_id=house.customer_id) 
               INNER JOIN money_management 
               ON money_management.house_id=house.house_id
               WHERE house.address='$address' and house.village_no='$villageno'";
       
       
       
       $result = mysqli_query($conn,$sql);
           if($result) {
       $arr = array();
           while($row = mysqli_fetch_assoc($result))
               {
               $arr[]=$row;
               }
           echo json_encode($arr);
           }
           
       ?>
