<?php get_header() ?>
        <div class="content">
            <div class="flex items-center justify-center">
                <div class="flex items-center justify-center group h-[400px]">
                    <a id="menu-about" href="<?php echo make_url(get_current_lang(), '/about'); ?>" class="home-menu-item px-[48px] group-hover:px-[60px] duration-[300ms] cursor-pointer">
                        درباره من    
                    </a>
                </div>
                <div class="flex items-center justify-center group">
                    <img class="w-auto h-[400px]" src='<?php echo get_template_directory_uri().'/images/border.png'?>'/>
                    <a id="menu-projects" href="<?php echo make_url(get_current_lang(), '/about'); ?>" class="home-menu-item px-[48px] group-hover:px-[60px] duration-[300ms] cursor-pointer">
                        پروژه‌ها    
                    </a>
                </div>
                <div class="flex items-center justify-center group">
                    <img class="w-auto h-[400px]" src='<?php echo get_template_directory_uri().'/images/border.png'?>'/>
                    <a id="menu-resume" href="<?php echo make_url(get_current_lang(), '/about'); ?>" class="home-menu-item px-[48px] group-hover:px-[60px] duration-[300ms] cursor-pointer">
                        روزمه کامل   
                    </a>
                </div>
                <div class="flex items-center justify-center group">
                    <img class="w-auto h-[400px]" src='<?php echo get_template_directory_uri().'/images/border.png'?>'/>
                    <a id="menu-contact" href="<?php echo make_url(get_current_lang(), '/about'); ?>" class="home-menu-item px-[48px] group-hover:px-[60px] duration-[300ms] cursor-pointer">
                        تماس با من    
                    </a>
                </div>
            </div>
        </div>
<?php get_footer() ?>



