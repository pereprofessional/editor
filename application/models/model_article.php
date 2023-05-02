<?php

class Model_Article extends Model
{
    public function write_article($article_name, $slug, $article_text, $date_created, $ip, $token) {
        $article_name = mysqli_real_escape_string($this->mysqli, $article_name);
        $slug = mysqli_real_escape_string($this->mysqli, $slug);
        $article_text = mysqli_real_escape_string($this->mysqli, $article_text);
        $date_created = mysqli_real_escape_string($this->mysqli, $date_created);
        $ip = mysqli_real_escape_string($this->mysqli, $ip);
        $token = mysqli_real_escape_string($this->mysqli, $token);

        $result = $this->mysqli->query('
            INSERT INTO blog_articles 
            (name, slug, text, date_created, ip, token) 
            VALUES ("'.$article_name.'", "'.$slug.'", "'.$article_text.'", "'.$date_created.'", "'.$ip.'", "'.$token.'") ');
        return $result;
    }

    public function select_article_by_slug($slug) {
        $slug = mysqli_real_escape_string($this->mysqli, $slug);
        $result = $this->mysqli->query('SELECT * FROM blog_articles WHERE slug = "'.$slug.'" ')->fetch_all(MYSQLI_ASSOC);
        return $result;
    }

    public function update_article_by_slug($article_name, $article_text, $article_slug) {
        $article_name = mysqli_real_escape_string($this->mysqli, $article_name);
        $article_text = mysqli_real_escape_string($this->mysqli, $article_text);
        $article_slug = mysqli_real_escape_string($this->mysqli, $article_slug);
        if ($this->mysqli->query('
            UPDATE blog_articles 
            SET name = "'.$article_name.'", text = "'.$article_text.'"
            WHERE slug = "'.$article_slug.'" 
        ') === TRUE) {
            return 'updated';
        } else {
            return 'could_not_update';
        }
    }
}
