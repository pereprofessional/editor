<? if ($data['status'] == 'fail') : ?>
    <div class="content editor-read-article-empty">
        <h1>Статья не найдена :(</h1>
    </div>
<? else : ?>
    <div class="content editor-read-article">

        <h1 class="title">
            <?=$data['name']?>
            <?= (($_COOKIE['token'] == $data['token']) && (time() - strtotime($data['date_created']) < 60*60)) ? '<a href="/editor/article/'.$data['slug'].'/edit">Редактировать статью</a>' : '' ?>
        </h1>
        <? echo $data['text']; ?>
    </div>
<? endif; ?>
