<?

if (isset($_POST['data']))
{
	$data = urldecode(base64_decode($_POST['data']));
	$data = str_replace("\n", " ", $data); $data = str_replace("\r", " ", $data); $data = str_replace("\"", "'", $data);
	$data = explode('{divider}', $data);
	array_push($data, date("Y-m-d H:i:s"));

	if (isset($data[7]))
	if ($data[7] == 'add_article')
	{
		include 'db.php';
		global $db;

		if (mb_strlen($data[6]) > 700)
		{
			$textShort = closetags(mb_substr($data[6], 0, mb_strpos($data[6], ' ', 700)));
		}
		else
		{
			$textShort = $data[6];
		}
		

		$sql = "INSERT INTO blog_articles (datetime, name, slug_name, tags, category, meta_keywords, meta_description, text, text_short, preview_image) VALUES (:datetime, :name, :slug_name, :tags, :category, :meta_keywords, :meta_description, :text, :text_short, :preview_image)";
		$query = $db->prepare($sql);
		$query->execute(array(
			':datetime' => $data[9],
			':name' => $data[0],
			':slug_name' => $data[1],
			':tags' => $data[2],
			':category' => $data[3],
			':meta_keywords' => $data[4],
			':meta_description' => $data[5],
			':text' => $data[6],
			':text_short' => $textShort,
			':preview_image' => $data[8] ));
		echo 'inserted id: '.$db->lastInsertId();

		/*
		[0]=>
		  string(12) "article name"
		  [1]=>
		  string(9) "slug-name"
		  [2]=>
		  string(5) "Tags "
		  [3]=>
		  string(9) "Category "
		  [4]=>
		  string(13) "Meta keywords"
		  [5]=>
		  string(16) "Meta description"
		  [6]=>
		  string(23) "<p>EDITOR SUKA BLYA</p>"
		  [7]=>
		  string(11) "add_article"
		  [8]=>
		  string(19) "2019-11-22 08:35:13"
		*/
	}
	if ($data[7] == 'edit_article')
	{
		if (mb_strlen($data[6]) > 700)
		{
			$textShort = closetags(mb_substr($data[6], 0, mb_strpos($data[6], ' ', 700)));
		}
		else
		{
			$textShort = $data[6];
		}

		$data = [
			'id' => $data[8],
			'name' => $data[0],
			'slug_name' => $data[1],
			'tags' => $data[2],
			'category' => $data[3],
			'meta_keywords' => $data[4],
			'meta_description' => $data[5],
			'text' => $data[6],
			'text_short' => $textShort,
			'preview_image' => $data[9]
			];
		include 'db.php';
		global $db;
		$sql = "
			UPDATE blog_articles pt
			SET pt.name=:name, pt.slug_name=:slug_name, pt.tags=:tags, pt.category=:category, pt.meta_keywords=:meta_keywords, pt.meta_description=:meta_description, pt.text=:text, pt.text_short=:text_short, pt.preview_image=:preview_image
			WHERE pt.id=:id";

		$query = $db->prepare($sql);
		$query->execute($data);

		/*
		[0]=>
		  string(12) "article name"
		  [1]=>
		  string(9) "slug-name"
		  [2]=>
		  string(5) "Tags "
		  [3]=>
		  string(9) "Category "
		  [4]=>
		  string(13) "Meta keywords"
		  [5]=>
		  string(16) "Meta description"
		  [6]=>
		  string(23) "<p>EDITOR SUKA BLYA</p>"
		  [7]=>
		  string(11) "edit_article"
		  [8]=>
		  string(11) "ID OF ARTICLE EPTA"
		  [9]=>
		  string(19) "2019-11-22 08:35:13"
		*/
	}
}





if (isset($_GET['reason']))
{
	if ($_GET['reason'] == 'get_data')
	{
		include 'db.php';
		global $db;
		$result = $db->query('SELECT * FROM blog_articles WHERE id = \''.$_GET['target'].'\'')->fetchAll();

		$data = $result[0];

		//echo base64_encode(json_encode($data, JSON_UNESCAPED_UNICODE));
		echo base64_encode(json_encode($data, JSON_UNESCAPED_UNICODE));
	}
	if ($_GET['reason'] == 'delete_article')
	{
		include 'db.php';
		global $db;
		$query = $db->prepare("DELETE FROM blog_articles WHERE id =:id");
	    $query->bindParam(':id', $_GET['target']);
	    if ($query->execute());

	    echo 'finished deleting process with id = '.$_GET['target'];
	}
}


function closetags($html) 
{
    preg_match_all('#<(?!meta|img|br|hr|input\b)\b([a-z]+)(?: .*)?(?<![/|/ ])>#iU', $html, $result);
    $openedtags = $result[1];
    preg_match_all('#</([a-z]+)>#iU', $html, $result);
    $closedtags = $result[1];
    $len_opened = count($openedtags);
    if (count($closedtags) == $len_opened) 
    {
		return $html;
	}
    $openedtags = array_reverse($openedtags);
    for ($i=0; $i < $len_opened; $i++) 
    {
        if (!in_array($openedtags[$i], $closedtags)) 
        {
            $html .= '</'.$openedtags[$i].'>';
        } 
        else 
        {
            unset($closedtags[array_search($openedtags[$i], $closedtags)]);
        }
    }
    return $html;
} 
?>