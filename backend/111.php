<?php
 require "conndb.php";
 $sql_d ="  SELECT * FROM datamoney
            WHERE  house_id = 1";

$result_d = mysqli_query($conn,$sql_d);

$row_d = mysqli_fetch_assoc($result_d);

var_dump($row_d);


             if($row_d)
             {
                 echo "ok";
             }
             ?>
