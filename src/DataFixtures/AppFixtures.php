<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Topic;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    protected $encoder;

    public function __construct( UserPasswordEncoderInterface $encoder)
    {
        $this->encoder=$encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user=new User();

        $user->setEmail("toto@toto.com")
        ->setPassword($this->encoder->encodePassword($user, "totototo"));

        $manager->persist($user);

        $faker = \Faker\Factory::create();
        
        for ($t=0; $t <9 ; $t++) { 
            $topic = new Topic();

            $topic->setCoefficient($faker->numberBetween(1, 5))
            ->setDuration($faker->numberBetween(2, 5))
            ->setLevel($faker->randomElement(["BAC", "DEF", "CAP", "BT"]))
            ->setSerie($faker->randomElement(["TSE", "TSS", "TSECO", "TSEXP", "TLL", "TAL", "MTI"]))
            ->setSpeciality($faker->word())
            ->setYearacademic($faker->year())
            ->setTopicName($faker->sentence(3, true));

            $manager->persist($topic);
            
        }

        $manager->flush();
    }
}
