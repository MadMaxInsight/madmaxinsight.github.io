<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];


// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$tel
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'cool-dev@bk.ru'; // Логин на почте
    $mail->Password   = 'Trishin061195'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 587;
    $mail->setFrom('cool-dev@bk.ru', 'Антон'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('tosha.trishin@bk.ru');  
    $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

    // Прикрипление файлов к письму

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if (!$mail->send()) {
    echo 'Error';
} else {
    header (location: "mail.php");
}
// } catch (Exception $e) {
//     $result = "error";
//     $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
// }

// // Отображение результата
// echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
// // header (location: "mail.php")
