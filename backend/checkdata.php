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


$sql_check_address = "  SELECT * FROM house
                        WHERE address='$address' and village_no='$villageno'";

    $check_address=mysqli_query($conn,$sql_check_address);

$arr_check_address = array();
        while($row_check_address = mysqli_fetch_assoc($check_address))
            {
                $arr_check_address[]=$row_check_address;
            }
//     echo json_encode($arr_check_address) ;  
    if($arr_check_address){ 

        $sql_check = "  SELECT * FROM house
                        INNER JOIN meter_management 
                        ON meter_management.house_id=house.house_id
                        WHERE house.address='$address' and house.village_no='$villageno'";

        $check=mysqli_query($conn,$sql_check);
        $arr_check = array();
                while($row_check = mysqli_fetch_assoc($check))
                {
                        $arr_check[]=$row_check;
                }
                // echo json_encode($arr_check) ;      
                if(!$arr_check){

                    $sql_villageid = "  SELECT house.house_id FROM house            
                                        WHERE address='$address' and village_no='$villageno'";

                            $villageid=mysqli_query($conn,$sql_villageid);

                    $arr = array();
                            while($row = mysqli_fetch_assoc($villageid))
                            {
                                    $arr[]=$row;
                            }
                            
                        //     echo json_encode($arr) ;
                            $v=$arr[0]["house_id"];
                            $total_meter=0;
                            $meter=0;
                            $money=0;

                            $sql_add_villageid = "INSERT INTO `watermanagement`.`meter_management` 
                            (`meter_id`, `meter_previos`, `meter_after`, `meter_united`,`money`, `unit_price_id`, `house_id`, `user_id`) 
                            VALUES ('0','0','0','0','0','0','$v','0')";

                                $result_add_villageid = mysqli_query($conn,$sql_add_villageid);


                        $owe=0;
                        $current_money=0;
                        $total_money=0;
                                
                                $sql_money = "INSERT INTO `watermanagement`.`money_management` (`house_id`, `owe`, `current_money`, `total_money`) VALUES ('$v', '0', '0', '0')";
                                
                                    $result_money= mysqli_query($conn,$sql_money);

                                    $sql = "    SELECT house.*,customer.*,MAX(meter_after) AS total_meter2 FROM (house 
                                                INNER JOIN customer 
                                                ON customer.customer_id=house.customer_id) 
                                                INNER JOIN meter_management 
                                                ON meter_management.house_id=house.house_id
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
                                
                        
                }else{
                        $sql = "SELECT house.*,customer.*,MAX(meter_after) AS total_meter2 FROM (house 
                                INNER JOIN customer 
                                ON customer.customer_id=house.customer_id) 
                                INNER JOIN meter_management 
                                ON meter_management.house_id=house.house_id
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
                }

    }
    ?>



    
