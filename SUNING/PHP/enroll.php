<?php
     header("Content-type: text/html; charset=UTF-8");
    // $username=$_POST["username"];
    // $password=$_POST["password"];
    // $tel=$_POST["tel"];
    // $age=$_POST["age"];
    $request=file_get_contents('php://input');
    $request=json_decode($request);
    var_dump($request);
    $tel=$request->tel;
    $password=$request->password;
    $coon=new mysqli('localhost','root','','db_student_admin',3306);
    $insert="INSERT INTO registor(tel,password) VALUES('$tel','$password')";
    $coon->query("SET CHARACTER SET utf8");
    $coon->query("SET NAMES utf8");
    $row=$coon->query($insert);
    ?>