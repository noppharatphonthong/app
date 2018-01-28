<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     $datameter = json_decode(file_get_contents('php://input'), true);
    
     $meter = $datameter['savemeter'];
     $total_meter = $datameter['total_meter'];
     $meteradd = $meter-$total_meter;
     $villageid = $datameter['villageid'];
     $money=0;

     require "conndb.php";
     
          $date = date("Y-m") ;
        //   echo $date ;
     
          $sql_meter ="  SELECT * FROM meter_management
                         WHERE  house_id = '$villageid'and (SELECT MAX(id) FROM meter_management)";
     
             $result_meter = mysqli_query($conn,$sql_meter);
     
             $arr_meter = array();
             while($row_meter = mysqli_fetch_assoc($result_meter))
                 {
                     $arr_meter[]=$row_meter;
                 }
     
             $dmy = $arr_meter[0]['datatime'];
            //  echo json_encode($dmy);
            $dmy = date("Y-m", strtotime($dmy));
            //  echo json_encode($dmy);
     
             if($date==$dmy){

                $meteradd = $meter-$arr_meter[0]['meter_previos'];

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
                 $sql_id ="  SELECT MAX(id) AS maxid FROM meter_management
                             WHERE  house_id = '$villageid'";
     
                     $result_id = mysqli_query($conn,$sql_id);
     
                     $arr_id = array();
                     while($row_id = mysqli_fetch_assoc($result_id))
                         {
                             $arr_id[]=$row_id;
                         }
                        //  echo json_encode($arr_id[0]['maxid']);
     $maxid= (int)$arr_id[0]['maxid'];
    //  var_dump($maxid);
    //  echo json_encode($meter);
                                 
             
             $sql = "    UPDATE meter_management
                         SET meter_after='$meter',meter_united='$meteradd',money='$money'
                         WHERE id ='$maxid'";
                         
                   
     
             $result = mysqli_query($conn,$sql);
         
             if($maxid) {
         
                 $sql_total_money =" SELECT * FROM money_management
                                     WHERE  house_id = '$villageid'";
         
                 $result_total_money = mysqli_query($conn,$sql_total_money);
         
                 $arr = array();
                 while($row = mysqli_fetch_assoc($result_total_money))
                     {
                     $arr[]=$row;
                     }
                     
                 
                 $owe = $arr[0]["owe"];
                 
                 $current_money=$money;
                 $total_money= $owe+$current_money;
         
                 $sql_update_money = "   UPDATE money_management
                                         SET owe='$owe',current_money='$current_money',total_money='$total_money'
                                         WHERE house_id = '$villageid'";
                 
                     $result_update_money= mysqli_query($conn,$sql_update_money);
         
                     $payment="ยังไม่ได้ชำระค่าบริการ";
     
                     $sql_id ="  SELECT MAX(id) AS maxid FROM datamoney
                                 WHERE  house_id = '$villageid'";
     
                     $result_id = mysqli_query($conn,$sql_id);
     
                     $arr_id = array();
                     while($row_id = mysqli_fetch_assoc($result_id))
                         {
                             $arr_id[]=$row_id;
                         }
                        //  echo json_encode($arr_id[0]['maxid']);
                     $maxid= (int)$arr_id[0]['maxid'];
         
                     $sql_datamoney = "  UPDATE datamoney
                                         SET owe='$owe',current_money='$current_money',total_money='$total_money'
                                         WHERE house_id = '$villageid'and id='$maxid'";
         
                     $result_datamoney = mysqli_query($conn,$sql_datamoney);
         
                 
                 echo '{"status":"ok","message":"ok"}';
             } 
             }else{
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
         
             
         
         $sql = "INSERT INTO `watermanagement`.`meter_management` 
                 (`meter_id`, `meter_previos`, `meter_after`, `meter_united`,`money`, `unit_price_id`, `house_id`, `user_id`) 
                 VALUES ('0','$total_meter','$meter','$meteradd','$money','0','$villageid','0')";
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
             $total_money= $owe+$current_money;
     
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
             }
     
     
     
     
         
     ?>
     
     
