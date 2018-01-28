<?php
     header('Content-Type: application/json');
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
     header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');  
     header("Content-Type: application/json;charset=utf-8");
     $datamoney = json_decode(file_get_contents('php://input'), true);
    
     $villageid = $datamoney['villageid'];
   
    require "conndb.php";

   $sql_money ="    SELECT * FROM money_management
                    WHERE  house_id = '$villageid'";

        $result_money = mysqli_query($conn,$sql_money);

    $arr = array();
        while($row = mysqli_fetch_assoc($result_money))
            {
                $arr[]=$row;
            }

    $sql_date = "   SELECT MAX(datatime) FROM datamoney
                    WHERE house_id='$villageid'";

        $result_date = mysqli_query($conn,$sql_date);

    $arr_date = array();
        while($row_date = mysqli_fetch_assoc($result_date))
            {
                $arr_date[]=$row_date;
            }

     
      

        $owe = $arr[0]["owe"];
        $current_money=$arr[0]["current_money"];
        $total_money= $arr[0]["total_money"];
        $datatime=$arr_date[0]["MAX(datatime)"];   
        $payment="ชำระค่าบริการเรียบร้อยแล้ว";

    $sql = "INSERT INTO `watermanagement`.`datamoney` (`house_id`, `owe`, `current_money`, `total_money`, `payment`, `d_m_y`) 
            VALUES ('$villageid', '$owe', '$current_money', '$total_money', '$payment', '$datatime')";

        $result = mysqli_query($conn,$sql);

        $owe = 0;
        $current_money=0;
        $total_money= 0;

        $sql_update_money = "   UPDATE money_management
                                SET owe='$owe',current_money='$current_money',total_money='$total_money'
                                WHERE house_id = '$villageid'";
        
            $result_update_money= mysqli_query($conn,$sql_update_money);

           

        
        echo '{"status":"ok","message":"ok"}';
     
?>

