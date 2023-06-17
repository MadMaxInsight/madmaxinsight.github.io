<?php 
    session_start();
    if(isset($_SESSION['error'])){
        $error = $_SESSION['error'];
    }else{
        $error = true;
    }
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Страница заявки | SK Group Trans 2021</title>
    <link rel="icon" href="./img/favicon/favicon-120x120.png" type="image/x-icon">
    <!-- Стили -->
    <link rel="stylesheet" href="./css/style_autsorsing.css">
    <link rel="stylesheet" href="./css/style_adaptive_autsorsing/autsorsing-style-1024px.css">
    <link rel="stylesheet" href="./css/style_adaptive_autsorsing/autsorsing-style-768px.css">
    <link rel="stylesheet" href="./css/style_adaptive_autsorsing/autsorsing-style-420px.css">
    <link rel="stylesheet" href="./css/style_adaptive_autsorsing/autsorsing-style-375px.css">
</head>

<style>
    .main {
        height: 100vh;
    }

    .container {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .main-wrapper {
        padding: 110px 0;
        display: flex;
        height: 70%;
        width: 100%;
        align-items: center;
        align-items: flex-start;
        justify-content: space-around;
        flex-direction: column;
        color: #2B2B51;
        font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
        font-weight: 900;
        font-size: 3vw;
        margin-bottom: 1.8rem;
    }

    .block-header {
        -webkit-text-stroke: 2px #2B2B51;
    }

    h3.block-header {
        font-size: 3vh;
        -webkit-text-stroke: unset;
        color: #2B2B51;
    }

    nav {
        height: 50%;
    }

    nav,
    p,
    .social {
        margin-left: 4px;
    }

    p {
        font-size: 1.2rem;
    }

    .active-content__points {
        justify-content: start;
        align-items: flex-start;
    }

    nav a {
        color: #2B2B51;
        font-size: 2.5vh;
        margin-bottom: 0.7rem;
        text-decoration: underline;
    }

    nav a:hover {
        /* color: #454556; */
        font-weight: bold;
    }

    .social {
        display: flex;
    }

    .social__icon {
        margin-right: 2rem;
    }

    .social__icon:hover {
        transform: scale(1.1);
    }
</style>

<body class="thank-you-page">
    <header class="main-screen__header header" id="header">
        <a href='/'>
            <div class="header__logo logo">
                <img src="./img/main_screen/logo_big.png" alt="logo" class="logo-image">
                <div class="logo-name">ВЭД<br>Логистика<br>Таможенное оформление</div>
            </div>
        </a>
        <div class="header__info">
            <div class="header__number"><a href="tel:+78129831290">+7(812)983-12-90</a></div>
            <div class="header__button button"><a href="#question">Заказать звонок</a></div>
        </div>
    </header>

    <section class="main">
        <div class="grid">
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
        </div>
        <div class="grid-adaptive">
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
            <div class="grid__block-black"></div>
        </div>
        <div class="container">
            <div class="main-wrapper">
             <?php if(!$error){ ?>
                <h1 class="block-header">Спасибо за заявку!</h1>
                <p>
                    Скоро наш менеджер с Вами свяжется, а пока Вы можете ознакомиться с другими нашими услугами, перейдя
                    по ссылкам ниже.
                </p>
                <h3 class="block-header">Быстрые ссылки:</h3>
                <nav class="active-content__points" id="menu">
                    <a href="./index-autsorsing.html">Аутсорсинг ВЭД</a>
                    <a href="./index-tamojnya.html">Таможенное оформление</a>
                    <a href="./index-cargo.html">Сборные грузы</a>
                </nav>
            <?php }else{ ?>
                    <h1 class="block-header">
                        Уппс, заявка не была отправлена :(
                    </h1>
                    <p>
                        Что-то с почтовым сервером. Попробуйте другие другие способы связи.
                    </p>
                    <h3 class="block-header">Быстрые ссылки:</h3>
                    <div class="our-address__social social">
                        <div class="social__icon"><a
                                href="https://wa.me/88129831290?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%F0%9F%91%8B"><img
                                    src="./img/contact/wats.png" alt="wats"></a></div>
                        <div class="social__icon"><a href=""><img src="./img/contact/face.png" alt="face"></a></div>
                        <div class="social__icon"><a href="https://instagram.com/sk_group_trans"><img
                                    src="./img/contact/insta.png" alt="insta"></a></div>
                        <!-- <div class="social__icon"><a href=""><img src="./img/contact/vk.png" alt="vk"></a> -->
                    </div>
                </div>
            </div>
            <?php } ?>
    </section>

    <footer class="footer">
        <div class="footer__wrapper">
            <div class="footer-logo">
                <a href="/">
                    <img src="./img/contact/logo_footer.png" alt="logo" class="footer-logo__img">
                    <div class="footer-logo__name">ВЭД<br>Логистика<br>Таможенное оформление</div>
                </a>
            </div>
            <div class="footer-services">
                <div class="footer-services__name">Услуги:</div>
                <div class="footer-services__description">
                    <a href="./index-autsorsing.html">Аутсорсинг ВЭД</a>
                    <a href="./index-tamojnya.html">Таможенное оформление</a>
                    <a href="./index-cargo.html">Сборные грузы</a>
                </div>
            </div>
            <div class="footer-contact">
                <a href="tel:+78129831290">
                    <div class="footer-contact__phone">+7(812)983-12-90</div>
                </a>
                <a>
                    <div class="footer-contact__politics">Политика конфиденциальности</div>
                </a>
            </div>
        </div>
    </footer>

    <section class="good-product">
        <div class="good-product__copyrigth">
            Copyright © SKGroupTrans 2021. Все права защищены.
        </div>
        <div class="good-product__name">
            <a href="https://good-production.ru/" rel='nofollow'>Сайт разработан веб-студией "Good Production"</a>
        </div>
    </section>

</body>

</html>
<?php 
unset($_SESSION['error']);
session_abort();