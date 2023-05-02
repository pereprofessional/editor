<?
/*
if (0 < isset($_FILES['photos'][0]['error'])) 
{
	echo 'Error: ' . $_FILES['photos'][0]['error'] . '<br>';
}
else 
{
	$photosAmount = count($_FILES['photos']['tmp_name']);
	$photosNames = [];
	for ($i = 0; $i < $photosAmount; $i++)
	{
		$fileName = date('d.m.y_H-i-s').'_'.$i.'.jpg';
		$finalPath = 'images/'.$fileName;
		move_uploaded_file($_FILES['photos']['tmp_name'][$i], $finalPath);

		$photosNames[] = $fileName;
	}

	$data = array(
		'success' => true,
		'url' => $finalPath,
    );
	echo json_encode($data);
}*/

if (isset($_FILES['image']['tmp_name']))
if ($_FILES['image']['tmp_name'])
{
	$nameOnServer = date('d.m.y_H-i-s').'.jpg';
	$pathOnServer = 'images/'.$nameOnServer;
	move_uploaded_file($_FILES['image']['tmp_name'], $pathOnServer);

	include '../config.php';


	$data = array(
		'success' => true,
		'url' => $protocol.$path_blog.'/'.$pathOnServer
    );
	echo json_encode($data);
}



?>