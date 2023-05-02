<?
include '../db.php';
global $db;

$pageStatusForHeader = 'all';
$urlNameFinal = '';
if (isset($_GET['article']))
{
	$articleName = $_GET['article'];
	$result = $db->query('SELECT * FROM blog_articles WHERE slug_name = \''.$articleName.'\'')->fetchAll();

	//var_dump($result);
	if (isset($result[0]['id'])) { $data = $result[0]; $urlNameFinal = $data['slug_name']; }
	else
	{
		$result = $db->query('SELECT * FROM blog_articles WHERE id = \''.substr($articleName, 2).'\'')->fetchAll();
		if (isset($result[0]['id'])) { $data = $result[0]; $urlNameFinal = 'id'.$data['id']; }
	}
	if (isset($data['name'])) 
	{
		if ($data['name']) { $pageStatusForHeader = 'one'; }
		else { $pageStatusForHeader = 'all'; }
	}
	else {
		$pageStatusForHeader = 'all'; }
}
else { $pageStatusForHeader = 'all'; }


include '../config.php'; 
$rootPath = $protocol.$path_root.'/';

if ($pageStatusForHeader == 'all')
{
	$title = 'Блог GetBaikal.ru | ГетБайкал.ру';
	$meta['description'] = 'Блог о Байкале: куда поехать и что посмотреть';
	$meta['keywords'] = 'байкал, малое море, листвянка, ольхон, туры, куда поехать, экскурсии, что посмотреть';
	$meta['og:locale'] = 'ru_RU';
	$meta['og:title'] = $title;
	$meta['og:url'] = $protocol.$path_blog;
	$meta['og:site_name'] = 'Туры на Байкал | GetBaikal.ru | ГетБайкал.ру';
	$meta['og:image'] = $protocol.$path_root.'/src/logo_full.jpg';
	$meta['canonical'] = $protocol.$path_blog;
}
else if ($pageStatusForHeader == 'one')
{
	$datetimeForHeader = new DateTime($data['datetime']);
	$datetimeForHeader2 = $datetimeForHeader->format(DateTime::ATOM);
	$title = $data['name'].' | Блог GetBaikal.ru | ГетБайкал.ру';
	$meta['description'] = $data['meta_description'];
	$meta['keywords'] = $data['meta_keywords'];
	$meta['og:locale'] = 'ru_RU';
	$meta['og:title'] = $title;
	$meta['og:url'] = $protocol.$path_blog.'/article/'.$urlNameFinal;
	$meta['og:site_name'] = 'Туры на Байкал | GetBaikal.ru | ГетБайкал.ру';
	$meta['og:image'] = $data['preview_image'];
	$meta['og:type'] = 'article';
	$meta['article:published_time'] = $datetimeForHeader2;
	$meta['article:modified_time'] = $datetimeForHeader2;
	$meta['og:updated_time'] = $datetimeForHeader2;
	$meta['canonical'] = $protocol.$path_blog.'/article/'.$urlNameFinal;

}

include '../header.php'; 
?>



<div class="block bl_blog">
	<div class="content">
		<div class="container">
			<? include '../config.php'; ?>
			<!--<div class="disclaimer">
				<p>
				Вы находитесь в разделе блога сайта <a href="<?echo$protocol.$path_root;?>"><?echo$path_root;?></a>,
				доступного по адресу <a href="<?echo$protocol.$path_blog;?>"><?echo$path_blog;?></a>.</p>
			</div>-->
			<!--
			<div class="row">
				<div class="col-12 col-lg-3 col-m">
					<div class="blog_menu">
						<span class="ttlbm">Категории</span>
						<ul>
							<? 
							if (!isset($_GET['article']))
							{
								if (isset($_GET['category']))
								{
									if ($_GET['category'] == 'last') echo '<a href="'.$protocol.$path_blog.'" class="active"><li>Последние публикации</li></a>';
									else echo '<a href="'.$protocol.$path_blog.'"><li>Последние публикации</li></a>';
								}
								else
								{
									echo '<a href="'.$protocol.$path_blog.'" class="active"><li>Последние публикации</li></a>';
								}
							}
							else
							{
								echo '<a href="'.$protocol.$path_blog.'"><li>Последние публикации</li></a>';
							}
							?>
						</ul>
					</div>
				</div>
				<div class="col-12 col-lg-9 col-c">
					<?
					if (isset($_GET['article']))
					{
						$articleName = $_GET['article'];
						$result = $db->query('SELECT * FROM blog_articles WHERE slug_name = \''.$articleName.'\'')->fetchAll();

						//var_dump($result);


						if (isset($result[0]['id']))
						{
							$data = $result[0];
						}
						else
						{
							$result = $db->query('SELECT * FROM blog_articles WHERE id = \''.substr($articleName, 2).'\'')->fetchAll();

							if (isset($result[0]['id']))
							{
								$data = $result[0];
							}

						}


						if (isset($data['name'])) 
						{
							if ($data['name'])
							{
								echo '<div class="article">
									<h1 class="article_title_h1">'.$data['name'].'</h1>
									<div class="text">'.$data['text'].'</div>
								</div>';
							}
							else
							{
								showAllArticles();
							}
						}
						else
						{
							showAllArticles();
						}

					}
					else
					{
						showAllArticles();
					}


					function showAllArticles()
					{
						global $db;
						global $protocol;
						global $path_blog;
						$result = $db->query('SELECT * FROM blog_articles ORDER BY `datetime` DESC')->fetchAll();
						for ($i = 0; $i < count($result); $i++)
						{
							if ($result[$i]['slug_name'])
							{
								$url = $protocol.$path_blog.'/article/'.$result[$i]['slug_name'];
							}
							else
							{
								$url = $protocol.$path_blog.'/article/id'.$result[$i]['id'];
							}

							if ($result[$i]['text_short']) 
							{
								echo '<div class="article">
									<a href="'.$url.'" class="article_title"><h1 class="article_title_h1">'.$result[$i]['name'].'</h1></a>
									<div class="text">'.$result[$i]['text_short'].'</div>
									<div class="bottom">
										<div class="front"><a href="'.$url.'">Читать далее...</a></div>
										<div class="gradient"></div>
									</div>
								</div>';
							}
							else
							{
								echo '<div class="article">
									<a href="'.$url.'" class="article_title"><h1 class="article_title_h1">'.$result[$i]['name'].'</h1></a>
									<div class="text">'.$result[$i]['text'].'</div>
								</div>';
							}
							
						}
					}
					?>
				</div>
			</div>-->

			


			<?
			





					/*{
						$articleName = $_GET['article'];
						$result = $db->query('SELECT * FROM blog_articles WHERE slug_name = \''.$articleName.'\'')->fetchAll();

						//var_dump($result);


						if (isset($result[0]['id']))
						{
							$data = $result[0];
						}
						else
						{
							$result = $db->query('SELECT * FROM blog_articles WHERE id = \''.substr($articleName, 2).'\'')->fetchAll();

							if (isset($result[0]['id']))
							{
								$data = $result[0];
							}

						}*/
			?>


			
			<? 
			$pageStatus = 'all'; // all — all pages / one — certain article
			if (isset($_GET['article']))
			{
				if ($_GET['article'])
				{
					$data = getArticleByIdOrSlug($_GET['article']);
					if ($data != 'fail') 
					{ 
						$pageStatus = 'one'; 
						$data2 = getAllArticles($data['id']); // true — all except this one
					} 
					else 
					{ 
						$pageStatus = 'all'; 
					}
				}
				else
				{
					$pageStatus = 'all'; 
				}
			}
			else
			{
				$pageStatus = 'all';
			}
			//echo $pageStatus;
			if ($pageStatus == 'all') $data = getAllArticles();
			?>

			<? //var_dump($data); ?>

			
			<? if ($pageStatus == 'all') : ?>
				<div class="new-blog-style">
					<a href="<?echo getUrl($data[0]['slug_name'], $data[0]['id']);?>" class="hover-article">
						<div class="top-article article-new">
							<div class="row row-nbs">
								<div class="col-12 col-md-7 col-nbs-l">
									<div class="preview_image" style="background-image: url(<?echo$data[0]['preview_image']?>);"></div>
								</div>
								<div class="col-12 col-md-5 col-nbs-r">
									<h1 class="h1_header"><?echo$data[0]['name']?></h1>
									<div class="text">
										<?
										$text_short = $data[0]['text_short'];
										$text_short = str_replace('<a', '<span', $text_short);
										$text_short = str_replace('</a>', '</span>', $text_short);
										echo $text_short;
										?>
									</div>
									<div class="bottom">
										<div class="front">
											<span class="datetime"><?echo getDatetime($data[0]['datetime']);?></span>
										</div>
										<div class="grad"></div>
									</div>
								</div>
							</div>
						</div>
					</a>
					<div class="other-articles">
						<? for ($i = 1; $i < count($data); $i++) : ?>
							<div class="mini-article-wrap">
								<a href="<?echo getUrl($data[$i]['slug_name'], $data[$i]['id']);?>" class="hover-article">
									<div class="mini-article article-new">
										<div class="row row-nbs">
											<div class="col-12 col-nbs-l">
												<div class="preview_image" style="background-image: url(<?echo$data[$i]['preview_image']?>);"></div>
											</div>
											<div class="col-12 col-nbs-r">
												<h1 class="h1_header"><?echo$data[$i]['name']?></h1>
												<div class="text">
													<?
													$text_short = $data[$i]['text_short'];
													$text_short = str_replace('<a', '<span', $text_short);
													$text_short = str_replace('</a>', '</span>', $text_short);
													echo $text_short;
													?>
												</div>
												<div class="bottom">
													<div class="front">
														<span class="datetime"><?echo getDatetime($data[$i]['datetime']);?></span>
													</div>
													<div class="grad"></div>
												</div>
											</div>
										</div>
									</div>
								</a>
							</div>
						<? endfor; ?>
						
					</div>
				</div>
			<? endif; ?>
			<? if ($pageStatus == 'one') : ?>
				<div class="new-blog-style-single">
					<div class="article">
						<h1 class="article_title_h1"><?echo$data['name']?></h1>
						<div class="text"><?echo$data['text']?></div>
						<hr style="margin-top: 40px; margin-left: -15px; margin-right: -15px;">
						<div class="other-articles">
							<? for ($i = 0; $i < count($data2); $i++) : ?>
								<div class="mini-article-wrap">
									<a href="<?echo getUrl($data2[$i]['slug_name'], $data2[$i]['id']);?>" class="hover-article">
										<div class="mini-article article-new">
											<div class="row row-nbs">
												<div class="col-12 col-nbs-l">
													<div class="preview_image" style="background-image: url(<?echo$data2[$i]['preview_image']?>);"></div>
												</div>
												<div class="col-12 col-nbs-r">
													<h1 class="h1_header"><?echo$data2[$i]['name']?></h1>
													<div class="text">
														<?
														$text_short = $data2[$i]['text_short'];
														$text_short = str_replace('<a', '<span', $text_short);
														$text_short = str_replace('</a>', '</span>', $text_short);
														echo $text_short;
														?>
													</div>
													<div class="bottom">
														<div class="front">
															<span class="datetime"><?echo getDatetime($data2[$i]['datetime']);?></span>
														</div>
														<div class="grad"></div>
													</div>
												</div>
											</div>
										</div>
									</a>
								</div>
							<? endfor; ?>
						</div>
					</div>
				</div>
			<? endif; ?>
			



			<?
			function getArticleByIdOrSlug($articleName)
			{
				global $db;
				$result = $db->query('SELECT * FROM blog_articles WHERE slug_name = \''.$articleName.'\'')->fetchAll();

				if (isset($result[0]['id']))
				{
					return $result[0];
				}
				else
				{
					$result = $db->query('SELECT * FROM blog_articles WHERE id = \''.substr($articleName, 2).'\'')->fetchAll();

					if (isset($result[0]['id']))
					{
						return $result[0];
					}
					else
					{
						return 'fail';
					}
				}
			}

			function getAllArticles($except = false)
			{
				global $db;
				if ($except)
				{
					return $db->query('SELECT id, datetime, name, slug_name, text_short, preview_image FROM blog_articles WHERE id != \''.$except.'\'  ORDER BY `datetime` DESC')->fetchAll();
				}
				else
				{
					return $db->query('SELECT id, datetime, name, slug_name, text_short, preview_image FROM blog_articles ORDER BY `datetime` DESC')->fetchAll();
				}
				
			}

			function getUrl($slug_name, $id)
			{
				global $protocol;
				global $path_blog;
				if ($slug_name)
				{
					return $protocol.$path_blog.'/article/'.$slug_name;
				}
				else
				{
					return $protocol.$path_blog.'/article/id'.$id;
				}
			}

			function getDatetime($datetime)
			{
				$origin_datetime = $datetime;
				$datetime = new DateTime($datetime);
				$year = $datetime->format('Y');
				$month = $datetime->format('m');
				$day = $datetime->format('j');
				if ($month == '01') $month = 'января';
				if ($month == '02') $month = 'февраля';
				if ($month == '03') $month = 'марта';
				if ($month == '04') $month = 'апреля';
				if ($month == '05') $month = 'мая';
				if ($month == '06') $month = 'июня';
				if ($month == '07') $month = 'июля';
				if ($month == '08') $month = 'августа';
				if ($month == '09') $month = 'сентября';
				if ($month == '10') $month = 'октября';
				if ($month == '11') $month = 'ноября';
				if ($month == '12') $month = 'декабря';

				return $day.' '.$month.' '.$year;
			}
			?>
		</div>
	</div>
	<div class="bl_bg" style="background-image: url(<?echo$protocol.$path_root?>/src/ice-texture-long-min.jpg);"></div>
</div>




<? include '../footer.php'; ?>