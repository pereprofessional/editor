<?php

class Model_Main extends Model
{
    public function get_tasks($page, $limit, $order, $sort) {
        $page = mysqli_real_escape_string($this->mysqli, $page);
        $order = mysqli_real_escape_string($this->mysqli, $order);
        $sort = mysqli_real_escape_string($this->mysqli, $sort);
        $offset = ($page - 1) * $limit;

        //$result = $this->mysqli->query('SELECT * FROM tasks ORDER BY '.$sort.' '.$order.' LIMIT '.$offset.','.$limit.' ')->fetch_all(MYSQLI_ASSOC);
        //return $result;
    }

    public function get_number_of_pages() {
        //$result = $this->mysqli->query('SELECT * FROM tasks  ')->num_rows;
        //return $result;
    }
}
