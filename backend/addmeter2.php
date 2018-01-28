<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     $meter2 = json_decode(file_get_contents('php://input'), true);
    
     $addmeter = array($meter2['addmeter']);
     $i=0;
    require "conndb.php";
 
do{
    $address = $addmeter[0][$i]['address'];
    $villageno = $addmeter[0][$i]['villageno'];
    $savemeter = $addmeter[0][$i]['savemeter'];

    
   if($address!=null){
    
    $sql = " SELECT * FROM house
             WHERE  village_no = '$villageno' and address = '$address'";

         $result= mysqli_query($conn,$sql);

         $arr = array();
         while($row = mysqli_fetch_assoc($result))
             {
                 $arr[]=$row;
             }
      $house_id = $arr[0]['house_id'];

      // echo json_encode($house_id);

      if($house_id){
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

                  $sql_add_villageid = "      INSERT INTO `watermanagement`.`meter_management` 
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
               
             
             
             
              }
      }


      $meter = $savemeter;
      $total_meter = $arr[0]["total_meter2"];
      $meteradd = $meter-$total_meter;
      $villageid = $house_id;
     
      $money=0;
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
                                $payment="ยังไม่ได้ชำระค่าบริการ";

                                $sql_d ="   SELECT * FROM datamoney
                                            WHERE  house_id = '$villageid'";
    
                                $result_d = mysqli_query($conn,$sql_d);
                                $row_d = mysqli_fetch_assoc($result_d);

                              if($row_d!=null){
                                  $sql_datamoney = " UPDATE datamoney
                                                     SET owe='$owe',current_money='$current_money',total_money='$total_money'
                                                     WHERE house_id = '$villageid'and id='$maxid'";
                     
                                 $result_datamoney = mysqli_query($conn,$sql_datamoney);
                              }else{

                                $sql_datamoney = "  INSERT INTO `watermanagement`.`datamoney` (`house_id`, `owe`, `current_money`, `total_money`, `payment`) 
                                                    VALUES ('$villageid','$owe','$current_money','$total_money','$payment')";
                                                   
                                $result_datamoney = mysqli_query($conn,$sql_datamoney);
                                
                                
        
                    
                                     
                              }

                                 
                             
                          
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
       
         }              
      
     
      
     require "conndb.php";
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
 
     
         
         
     } 

    }




}


      }

   
$i=$i+1;
}while($address);

echo '{"status":"ok","message":"ok"}';



    ?>