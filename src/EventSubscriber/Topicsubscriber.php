<?php

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Vich\UploaderBundle\Storage\StorageInterface;
use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\Topic;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class TopicSubscriber  implements EventSubscriberInterface{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
            return;
        }

        if (!($attributes = RequestAttributesExtractor::extractAttributes($request)) || !\is_a($attributes['resource_class'], Topic::class, true)) {
            return;
        }

        $topics = $controllerResult;

        if (!is_iterable($topics)) {
            $topics = [$topics];
        }

        foreach ($topics as $topic) {
            if (!$topic instanceof Topic) {
                continue;
            }

            // $topic->contentUrl = $this->storage->resolveUri($mediaObject, 'file');
        }
    }
}