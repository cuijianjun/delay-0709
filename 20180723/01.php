<?php
header("Content-Type:text/html;charset=utf-8");
$persons = array(
	array('username'=>'赵涛','sex'=>'gay'),
	array('username'=>'李华','sex'=>'gy'),
);
for($i=0;$i<count($persons);$i++){
	echo $persons[$i]['username'];
	echo '<br/>';
	echo $persons[$i]['sex'];
}
var_dump($persons);
echo '<br/>';
print_r($person);

?>