<?php

use Cassandra\Date;

class Profile
{
    public int $id;
    public string $username;
    public Date $dob;
    public int|null $best;

    public function __construct(int $id, string $username, Date $dob, int|null $best) {
        $this->id = $id;
        $this->username = $username;
        $this->dob = $dob;
        $this->best = $best;
    }

    public function has_best(): bool
    {
        return $this->best !== null;
    }
}