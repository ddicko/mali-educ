<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TopicRepository;
use App\Controller\CreateTopicController;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation\Uploadable;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Mapping\Annotation\UploadableField;

/**
 * @ORM\Entity(repositoryClass=TopicRepository::class)
 * 
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={
 *         "groups"={"topic:read"}
 *     },
 *     collectionOperations={
 *         "post"={
 *             "controller"=CreateTopicController::class,
 *             "deserialize"=false,
 *             "validation_groups"={"Default", "topic:create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "topicFile"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         },
 *         "get"
 *     },
 *     itemOperations={
 *         "get"
 *     }
 * )
 * 
 * @Vich\Uploadable
 */
class Topic
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups({"topic:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * 
     * @Groups({"topic:read"})
     *
     * @var string
     */
    private $topicName;

    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     * 
     * @Vich\UploadableField(mapping="topics", fileNameProperty="topicName")
     *
     * @Assert\NotNull(groups={"topic:create"})
     * 
     * @var File
     */
    private $topicFile;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"topic:read", "topic:create"})
     */
    private $yearacademic;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"topic:read", "topic:create"})
     */
    private $speciality;

    /**
     * @ORM\Column(type="integer")
     * 
     * @Groups({"topic:read", "topic:create"})
     */
    private $duration;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"topic:read",  "topic:create"})
     */
    private $serie;

    /**
     * @ORM\Column(type="integer")
     * 
     * @Groups({"topic:read",  "topic:create"})
     */
    private $coefficient;

    /**
     * @ORM\Column(type="string", length=255)
     * 
     * @Groups({"topic:read",  "topic:create"})
     */
    private $level;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getYearacademic(): ?string
    {
        return $this->yearacademic;
    }

    public function setYearacademic(string $yearacademic): self
    {
        $this->yearacademic = $yearacademic;

        return $this;
    }

    public function getSpeciality(): ?string
    {
        return $this->speciality;
    }

    public function setSpeciality(string $speciality): self
    {
        $this->speciality = $speciality;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSerie(): ?string
    {
        return $this->serie;
    }

    public function setSerie(string $serie): self
    {
        $this->serie = $serie;

        return $this;
    }

    public function getCoefficient(): ?int
    {
        return $this->coefficient;
    }

    public function setCoefficient(int $coefficient): self
    {
        $this->coefficient = $coefficient;

        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(string $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getTopicName(): ?string
    {
        return $this->topicName;
    }

    public function setTopicName(string $topicName): self
    {
        $this->topicName = $topicName;

        return $this;
    }

    public function getTopicFile()
    {
        return $this->topicFile;
    }

    public function setTopicFile(?File $topicFile = null)
    {
        $this->topicFile = $topicFile;

                return $this;
    }
}
