<?php
    $langs = array('fa' , 'en');
    $lang = get_current_lang();
?>

<!DOCTYPE html>
<html dir="rtl" lang="fa-IR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
    <meta name="theme-color" content="<?php get_option('my_color'); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="description" content="<?php bloginfo('description') ?>">
    <meta name="keywords" content="<?php bloginfo('description') ?>">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri().'/images/favicon.png' ?>" title="Favicon" />
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <?php wp_head(); ?>

</head>

<body dir="<?php echo ( $lang == 'en' ) ? 'ltr' : 'rtl' ?>" class='h-screen bg-cream-100 font-pinar dark:bg-dark-100 flex flex-col items-center justify-center relative'> 

<main class='w-full h-full flex flex-col justify-center grow'>
    <div class="container mx-auto px-5">

        <div class="flex flex-col justify-between items-center gap-y-5">
            <img src="<?php echo get_template_directory_uri().'/images/logo.png'?>" alt="logo" class="w-20 h-20">
            <div class="header-menu flex items-center gap-x-5 fixed top-[200px] " style="display: none;" data-hidden="true">
            <a href="<?php echo make_url(get_current_lang(), '/'); ?>" class="text-lg mx-2">صفحه اصلی</a>
                <a href="<?php echo make_url(get_current_lang(), '/about'); ?>" class="text-lg mx-2">درباره من</a>
                <a href="<?php echo make_url(get_current_lang(), '/projects'); ?>" class="text-lg mx-2">پروژه‌ها</a>
                <a href="<?php echo make_url(get_current_lang(), '/resume'); ?>" class="text-lg mx-2">روزمه کامل</a>
                <a href="<?php echo make_url(get_current_lang(), '/contact'); ?>" class="text-lg mx-2">تماس با من</a>
            </div>
        </div>
    
        <div class="flex justify-center items-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-180px)]">
            <img class="w-auto h-[400px] ml-2" src='<?php echo get_template_directory_uri().'/images/border.png'?>'/>
        

