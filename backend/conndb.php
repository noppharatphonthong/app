<?php
 $host="192.168.43.123";
 $user="root";
 $pass="";
 $db="watermanagement";

 $conn=mysqli_connect($host,$user,$pass,$db);
 mysqli_set_charset($conn,'utf8');
 if(!$conn)
 {
     echo "unconnect";
     echo mysqli_error_list();
 }

?>