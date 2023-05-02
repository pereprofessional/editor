<? if ($data['status'] == 'fail') : ?>
    <div class="content editor-read-article-empty">
        <h1><?=$data['message']?></h1>
    </div>
<? else : ?>
    <div class="content editor-edit-article">
        <input type="text" class="article-name" placeholder="Название" value="<?=$data['name']?>" />
        <textarea style="display: none;" class="article-text"><?=$data['text']?></textarea>
        <textarea style="display: none;" class="article-slug"><?=$data['slug']?></textarea>
        <div class="texter"></div>
        <div class="bottom">
            <button class="edit-article action-article">Сохранить изменения</button>
            <span class="error-alert"></span>
        </div>
    </div>
<? endif; ?>
