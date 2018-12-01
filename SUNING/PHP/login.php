<?php
 header("Content-type: text/html; charset=UTF-8");
 $request=file_get_contents('php://input');
 $request=json_decode($request);
 $username= $request->username;
 $password= $request->password;
  $coon=new mysqli("localhost","root","","db_student_admin",3306);
  $sql="SELECT tel FROM registor WHERE tel='$username'";
  $coon->query("SET CHARACTER SET 'utf8'");
  // $coon->query("SET NAMES 'utf8'");
  $row = $coon -> query($sql);    
  $result = $row -> fetch_assoc();
  if($result==null){
      echo 0;
    }else{
        $sqy="SELECT password FROM registor WHERE password='$password'";
        $rom= $coon -> query($sqy); 
        $resulu = $rom -> fetch_assoc();
        if($resulu==null){
            echo 1;
        }else{
            echo 2;
        }
    }

?>