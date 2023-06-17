<?php
session_start();
require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';
if(isset($_POST['name']) && isset($_POST['tel'])){
    // Переменные, которые отправляет пользователь
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];

    // Проверка страницы с формой
    $url_path = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_PATH);
    switch ($url_path) {
        case '/index-tamojnya.html':
            $page = 'Таможенное оформление';
            break;

        case '/index-cargo.html':
            $page = 'Сборные грузы';
            break;
        case '/index-autsorsing.html':
            $page = 'Аутсорсинг ВЭД';
            break;
        
        default:
            $page = 'Главная страница';
            break;
    }

    // Формирование самого письма
    $title = "Заявка с сайта skgrouptrans.ru";
    $body = "
    <h2>Данные</h2>
    <b>Страница с формой:</b> $page<br>
    <b>Имя:</b> $name<br>
    <b>Почта:</b> $email<br>
    <b>Телефон:</b> $tel<br>
    ";

    $_SESSION['error'] = 0;

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = "UTF-8";
    $mail->setFrom('site-notification@skgrouptrans.ru', 'SK Group Trans'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('skgrouptrans@gmail.com');  
    $mail->addAddress('maxvarvarin3@gmail.com'); 

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    // Проверяем отравленность сообщения

    if (!$mail->send()) {
        // неуданая отправка
        $_SESSION['error'] = 1;
        header ("Location: thank-you-page.php");
    } else {
        // удачная отправка
        $_SESSION['error'] = 0;
        header ("Location: thank-you-page.php");
    }
}else{    
    $_SESSION['error'] = 1;
    header ("Location: thank-you-page.php");
}
?>