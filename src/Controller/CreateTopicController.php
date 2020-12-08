<?php

namespace App\Controller;

use App\Entity\Topic;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class CreateTopicController{
    public function __invoke(Request $request)
    {
        $topicFile = $request->files->get('topicFile');

        dd($request->request);

        if (!$topicFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new Topic();

        return $mediaObject;
    }
}