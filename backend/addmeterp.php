<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     $datameter = json_decode(file_get_contents('php://input'), true);
    
     $meter = $datameter['savemeter'];
     $villageid = $datameter['villageid'];
    
     require "conndb.php";
     $sql_mm =  "        SELECT MAX(id) AS max_idm FROM datamoney
                        WHERE  house_id = '$villageid'";

                $result_mm = mysqli_query($conn,$sql_mm);

                $arr_mm  = array();
                while($row_mm  = mysqli_fetch_assoc($result_mm))
                        {
                                $arr_mm[]=$row_mm;
                        }


                // echo json_encode($arr_mm);
                $max_idm=$arr_mm[0]['max_idm'];
                // echo json_encode($max_idm);

     $sql_total_money =" SELECT current_money FROM datamoney
                         WHERE  house_id = '$villageid'and id ='$max_idm'";
     
             $result_total_money = mysqli_query($conn,$sql_total_money);
     
             $arr_total_money  = array();
             while($row_total_money  = mysqli_fetch_assoc($result_total_money))
                 {
                 $arr_total_money[]=$row_total_money ;
                 }

     $total_moneyp = $arr_total_money[0]['current_money'];
    //  echo json_encode($total_moneyp);
    

    $sql_m =  "     SELECT MAX(id) AS max_id FROM meter_management
                        WHERE  house_id = '$villageid'";

                $result_m = mysqli_query($conn,$sql_m);

                $arr_m  = array();
                while($row_m  = mysqli_fetch_assoc($result_m))
                        {
                                $arr_m[]=$row_m;
                        }

             
                // echo json_encode($arr_m);
                $max_id=$arr_m[0]['max_id'];
                // echo json_encode($max_id);

        $sql_m2 =  "     SELECT MAX(id)AS max_id2 FROM meter_management
                        WHERE  house_id = '$villageid' and id<'$max_id' ";

        $result_m2 = mysqli_query($conn,$sql_m2);

        $arr_m2  = array();
        while($row_m2  = mysqli_fetch_assoc($result_m2))
                {
                        $arr_m2[]=$row_m2;
                }
        //  echo json_encode($arr_m2);
        $max_id2=$arr_m2[0]['max_id2'];
        // echo json_encode($max_id2);
        
        $sql_meter =  "   SELECT meter_management.* FROM meter_management
                                WHERE  house_id = '$villageid'and id='$max_id2'";

                $result_meter= mysqli_query($conn,$sql_meter);

                $arr_meter  = array();
                while($row_meter  = mysqli_fetch_assoc($result_meter))
                        {
                                $arr_meter[]=$row_meter;
                        }

              
                // echo json_encode($arr_meter);

                $meter_id=$arr_meter[0]['meter_id'];
                $meter_previos=$arr_meter[0]['meter_after'];
                $meter_after=$arr_meter[0]['meter_after'];
                $meter_united=0;
                $money=0;
                $unit_price_id =$arr_meter[0]['unit_price_id'];
                $house_id =$arr_meter[0]['house_id'];
                $user_id=$arr_meter[0]['user_id'];

                // echo json_encode($arr_meter[0]['meter_after']);

                $sql_update_money = "   UPDATE meter_management
                                        SET meter_id='$meter_id',meter_previos='$meter_previos',meter_after='$meter_after',meter_united='$meter_united',money='$money', unit_price_id ='$unit_price_id', house_id ='$house_id', user_id='$user_id'
                                        WHERE house_id = '$house_id'and id = $max_id";

                        $result_update_money= mysqli_query($conn,$sql_update_money);
                
                
                        
                        $total_meter = $arr_meter[0]['meter_after'];
                        $meteradd = $meter-$total_meter;
                        
                       
                        $money=0;
                       if(($meteradd>0)&&($meteradd<=80))
                           {
                            $money = ($meteradd)*3;
                           }
                       else if(($meteradd>80)&&($meteradd<=100))
                           {
                           $money = ((($meteradd)-80)*6)+240;
                           }
                       else if(($meteradd>100)&&($meteradd<=200))
                           {
                           $money = ((($meteradd)-100)*9)+360;
                           }
                       else if($meteradd>200)
                           {
                           $money = ((($meteradd)-200)*12)+1260;
                           }
                       else{
                           echo '{"status":"no","message":"no"}';
                           }              
                       
                       
                        
                       require "conndb.php";
                       $sql = "INSERT INTO `watermanagement`.`meter_management` 
                               (`meter_id`, `meter_previos`, `meter_after`, `meter_united`,`money`, `unit_price_id`, `house_id`, `user_id`) 
                               VALUES ('$meter_id','$total_meter','$meter','$meteradd','$money','$unit_price_id','$villageid','$user_id')";
                       $result = mysqli_query($conn,$sql);
                   
                       if($result) {
                   
                           $sql_total_money =" SELECT money_management.total_money FROM money_management
                                               WHERE  house_id = '$villageid'";
                   
                           $result_total_money = mysqli_query($conn,$sql_total_money);
                   
                           $arr = array();
                           while($row = mysqli_fetch_assoc($result_total_money))
                               {
                               $arr[]=$row;
                               }
                               
                           
                           $owe = $arr[0]["total_money"];
                           
                           $current_money=$money;
                           $total_money= $owe+$current_money-$total_moneyp;
                           if($owe!=0){
                               $owe=$owe-$total_moneyp;
                           }
                   
                           $sql_update_money = "   UPDATE money_management
                                                   SET owe='$owe',current_money='$current_money',total_money='$total_money'
                                                   WHERE house_id = '$villageid'";
                           
                               $result_update_money= mysqli_query($conn,$sql_update_money);
                   
                               $payment="ยังไม่ได้ชำระค่าบริการ";
                   
                               $sql_datamoney = "INSERT INTO datamoney (house_id,owe,current_money,total_money,payment) 
                                                 VALUES('$villageid','$owe','$current_money','$total_money','$payment')";
                   
                           $result_datamoney = mysqli_query($conn,$sql_datamoney);
                   
                           
                           echo '{"status":"ok","message":"ok"}';
                       } 



?>