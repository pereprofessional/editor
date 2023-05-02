<?php

if (isset($_FILES['image']['tmp_name']))
if ($_FILES['image']['tmp_name'])
{
	$nameOnServer = date('d.m.y_H-i-s').'.jpg';
	$pathOnServer = 'images/'.$nameOnServer;
	move_uploaded_file($_FILES['image']['tmp_name'], $pathOnServer);

	$data = array(
		'success' => true,
		'url' => $pathOnServer
    );
	echo json_encode($data);
}



?>