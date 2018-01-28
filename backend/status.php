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
     $sql = "    SELECT house_id FROM house 
                 WHERE address='$address'and village_no='$villageno'";
 
         $result = mysqli_query($conn,$sql);
     $arr = array();
     while($row = mysqli_fetch_assoc($result))
         {
         $arr[]=$row;
         }
            //  echo json_encode($arr);
             $villageid=$arr[0]["house_id"];
            //  echo json_encode($arr);
         if($arr){
 
             $sql_maxid = "   SELECT MAX(id)AS maxid FROM datamoney
                             WHERE house_id='$villageid'";
 
                 $result_maxid = mysqli_query($conn,$sql_maxid);
             $arr_maxid = array();
             while($row_maxid = mysqli_fetch_assoc($result_maxid))
                 {
                 $arr_maxid[]=$row_maxid;
                 }
                    //  echo json_encode($arr_maxid);
 
                 $maxid=$arr_maxid[0]["maxid"];
                //  echo json_encode($maxid);
 
 if($maxid!=""){
                 $sql_payment = "SELECT payment FROM datamoney
                                 WHERE id='$maxid'";
 
                     $result_payment = mysqli_query($conn,$sql_payment);
                     $arr_payment = array();
                     while($row_payment = mysqli_fetch_assoc($result_payment))
                         {
                         $arr_payment[]=$row_payment;
                         }
                        //    print_r($arr_payment);
 
                           $payment=$arr_payment[0]["payment"];
 
             $sql_minid = "  SELECT MAX(id)AS minid FROM datamoney
                             WHERE house_id='$villageid'and payment='ชำระค่าบริการเรียบร้อยแล้ว'";
 
               $result_minid = mysqli_query($conn,$sql_minid);
           $arr_minid = array();
           while($row_minid = mysqli_fetch_assoc($result_minid))
               {
               $arr_minid[]=$row_minid;
               }
                //    echo json_encode($arr_minid);
 
               $minid=$arr_minid[0]["minid"];
            //    echo json_encode($minid);
 
 if($payment=="ชำระค่าบริการเรียบร้อยแล้ว"){
     $sql_data = "   SELECT house.address,house.village_no,customer.name,customer.lastname,
                     datamoney.owe,datamoney.current_money,datamoney.total_money,datamoney.payment,
                     datamoney.datatime,datamoney.d_m_y
                     FROM (house INNER JOIN customer ON customer.customer_id=house.customer_id) 
                     INNER JOIN datamoney 
                     ON datamoney.house_id=house.house_id
                     WHERE house.house_id='$villageid'and payment='ชำระค่าบริการเรียบร้อยแล้ว'
                     ORDER BY `id` DESC";
 
         $result_data = mysqli_query($conn,$sql_data);
     $arr_data = array(); 
     while($row_data = mysqli_fetch_assoc($result_data))
         {
         $arr_data[]=$row_data;
         }
         echo json_encode($arr_data);  
 
 }else if($payment=="ยังไม่ได้ชำระค่าบริการ"){
     $sql_data = "   SELECT house.address,house.village_no,customer.name,customer.lastname,
                     datamoney.owe,datamoney.current_money,datamoney.total_money,datamoney.payment,
                     datamoney.datatime,datamoney.d_m_y 
                     FROM (house INNER JOIN customer ON customer.customer_id=house.customer_id) 
                     INNER JOIN datamoney 
                     ON datamoney.house_id=house.house_id
                     WHERE house.house_id='$villageid'and payment='ยังไม่ได้ชำระค่าบริการ' and id >'$minid'
                     ORDER BY `id` DESC";
 
     $result_data = mysqli_query($conn,$sql_data);
     $arr_data = array(); 
         while($row_data = mysqli_fetch_assoc($result_data))
             {
                 $arr_data[]=$row_data;
             }
             echo json_encode($arr_data);    
         }
 
             
             
 
         }else{
             echo '[{"name":"ไม่พบข้อมูล"}]';
         }}
         
 ?>