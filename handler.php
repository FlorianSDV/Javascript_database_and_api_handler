<?php
include "config/configdb.php";
function getDogs($searchInput)
{
    $dogBreed = $searchInput;
    $apiUrl = "https://dog.ceo/api/breed/$dogBreed/images";

    return file_get_contents($apiUrl);
}

function getMagicCards($searchInput, $pdo)
{
    $input = '%' . $searchInput . '%';
    $stmt = $pdo->prepare("Select * From all_cards where `name` like :input");
    $stmt->execute(["input" => $input]);
    return $stmt->fetchAll();
}

if (isset($_POST['searchInput']) && isset($_POST['dogsOrMagicCards'])) {
    $searchInput = strtolower($_POST['searchInput']); // some requests don't work when input has upper case characters.
    switch ($_POST['dogsOrMagicCards']) {
        case "Dogs":
            $result = getDogs($searchInput);
            $array = json_decode($result, true);
            if ($array['status'] == "success") {
                echo $result;
            }
            break;

        case "Magic_cards":
            $result = getMagicCards($searchInput, $pdo);
            echo json_encode($result);
            break;

        default:
            break;
    }
}