<?php

class Controller_Article extends Controller
{
    function __construct() {
        $this->model = new Model_Article();
        $this->view = new View();
    }

	function action_index() {
        if (isset($_POST['target'])) {
            if ($_POST['target'] == 'add-article')
                $this->add_article($_POST['article_name'], $_POST['article_text']);
            if ($_POST['target'] == 'edit-article-request')
                $this->edit_article_request($_POST['article_name'], $_POST['article_text'], $_POST['article_slug']);
        } else {
            if ($_GET['slug']) {
                $anchor = '/edit';
                if (strpos($_GET['slug'], $anchor) == (strlen($_GET['slug']) - strlen($anchor))) {
                    $slug = substr($_GET['slug'], 0, strpos($_GET['slug'], $anchor));
                    $this->edit_article($slug);
                } else {
                    $slug = $_GET['slug'];
                    $this->read_article($slug);
                }
            }
        }
	}

	protected function edit_article_request($article_name, $article_text, $article_slug) {
        $article = $this->model->select_article_by_slug($article_slug);
        if (!$article) {
            echo json_encode([ 'status' => 'fail', 'message' => 'article_does_not_exist' ], true);
            return;
        }

        if ((time() - strtotime($article[0]['date_created']) >= 60*60) || ($_COOKIE['token'] != $article[0]['token'])) {
            echo json_encode([ 'status' => 'fail', 'message' => 'can_not_edit_article' ], true);
            return;
        }

        $response = $this->model->update_article_by_slug($article_name, $article_text, $article_slug);

        echo json_encode([ 'status' => 'success', 'slug' => $article_slug ], true);
    }

	protected function read_article($slug) {
        $article = $this->model->select_article_by_slug($slug);

        if (!$article) {
            $data = [
                'status' => 'fail',
            ];
        } else {
            $data = [
                'status' => 'success',
                'name' => $article[0]['name'],
                'text' => $article[0]['text'],
                'slug' => $article[0]['slug'],
                'token' => $article[0]['token'],
                'date_created' => $article[0]['date_created'],
            ];
        }

        $this->view->generate('read_view.php', 'template_view.php', $data);
    }

    protected function edit_article($slug) {
        $article = $this->model->select_article_by_slug($slug);

        if (!$article) {
            $data = [
                'status' => 'fail',
                'message' => 'Статья не найдена :(',
            ];
        } elseif ((time() - strtotime($article[0]['date_created']) >= 60*60) || ($_COOKIE['token'] != $article[0]['token'])) {
            $data = [
                'status' => 'fail',
                'message' => 'Время редактирования статья истекло или она принадлежит не вам :(',
            ];
        } else {
            $data = [
                'status' => 'success',
                'name' => $article[0]['name'],
                'text' => $article[0]['text'],
                'slug' => $article[0]['slug'],
                'token' => $article[0]['token'],
                'date_created' => $article[0]['date_created'],
            ];
        }

        $this->view->generate('edit_view.php', 'template_view.php', $data);
    }

	protected function add_article($article_name, $article_text) {
        $article_name = urldecode($article_name);
        $article_text = urldecode($article_text);

        if (mb_strlen($article_name, 'UTF-8') < 6) {
            echo json_encode(['status' => 'fail', 'message' => 'article_name_short'], true);
            die;
        }
        if (mb_strlen($article_name, 'UTF-8') > 64) {
            echo json_encode(['status' => 'fail', 'message' => 'article_name_long'], true);
            die;
        }
        if (mb_strlen($article_text, 'UTF-8') < 100) {
            echo json_encode(['status' => 'fail', 'message' => 'article_text_short'], true);
            die;
        }

        $ip = $this->get_user_ip();
        $date_created = date('Y-m-d h:i:s');
        $token = hash('sha256', $ip);
        $slug = $this->generate_slug($article_name).'-'.time();
        $this->model->write_article($article_name, $slug, $article_text, $date_created, $ip, $token);
        echo json_encode([ 'status' => 'success', 'token' => $token, 'slug' => $slug ], true);
    }

    protected function get_user_ip() {
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP)) {
            $ip = $client;
        } elseif(filter_var($forward, FILTER_VALIDATE_IP)) {
            $ip = $forward;
        } else {
            $ip = $remote;
        }
        return $ip;
    }

    function generate_slug($string) {
        $string = mb_strtolower($string, 'UTF-8');
        $letters = [
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'y',
            'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f',
            'х' => 'h', 'ц' => 'ts', 'ч' => 'ch', 'ш' => 'sh', 'щ' => 'csh', 'ь' => '', 'ы' => 'i', 'ъ' => '', 'э' => 'e', 'ю' => 'u', 'я' => 'ya',
        ];
        foreach ($letters as $key => $value) {
            $string = str_replace($key, $value, $string);
        }
        $string = str_replace(' ', '-', $string);
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);

        return $string;
    }
}