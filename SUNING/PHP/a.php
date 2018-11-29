<?php
 header("Content-type: text/html; charset=UTF-8");
 $request=file_get_contents('php://input');
 $request=json_decode($request);
  $coon=new mysqli("localhost","root","","db_student_admin",3306);
  $sql="SELECT tel FROM registor WHERE tel='$request'";
  $coon->query("SET CHARACTER SET 'utf8'");
  // $coon->query("SET NAMES 'utf8'");
  $row = $coon -> query($sql);    
  $result = $row -> fetch_assoc();
  if($result==null){
      echo 0;
    }else{
      echo 1;
    }

?>