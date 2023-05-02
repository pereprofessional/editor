<div class="content editor-add-article">
    <input type="text" class="article-name" placeholder="Название" value="<?= ($_COOKIE['draft_name']) ? $_COOKIE['draft_name'] : '' ?>" />
    <?= ($_COOKIE['draft_text']) ? '<textarea style="display: none;" class="article-text">'.$_COOKIE['draft_text'].'</textarea>' : '' ?>
    <div class="texter"></div>
    <div class="bottom">
        <button class="add-article action-article">Опубликовать</button>
        <span class="error-alert"></span>
    </div>
</div>
<div class="content editor-finished-article" style="display: none;">
    <h1>Вашя статья опубликована!</h1>
    <div class="article-new-link">Ссылка на вашу статью: <a></a>.</div>
</div>