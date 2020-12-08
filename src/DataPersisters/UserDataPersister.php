<?php

namespace App\DataPersisters;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserDataPersister implements DataPersisterInterface{
    protected $encoder;
    protected $em;

    public function __construct(UserPasswordEncoderInterface $encoder, EntityManagerInterface $em)
    {
        $this->encoder=$encoder;
        $this->em=$em;
    }
    public function supports($data): bool
    {
        return $data instanceof User;
    }

    /**
     * Undocumented function
     *
     * @param User $data
     * @return void
     */
    public function persist($data)
    {
        $data->setPassword($this->encoder->encodePassword($data, $data->getPassword()));

        $this->em->persist($data);
        $this->em->flush();
    }

    public function remove($data)
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}