function openCloseNav () {
    const btn_nav = document.querySelector('.nab_bar_button');
    const btn_nav_close = document.querySelector('.close_nav');
    const content_nav = document.getElementById('content_nav');
    
    btn_nav.onclick = ()=> {
        content_nav.classList.remove('hidden');
    }

    btn_nav_close.onclick = ()=> {
        content_nav.classList.add('hidden');
    }
}


function subMenu() {
    const toggle_nav = document.querySelectorAll('.dropdown-toggle');

    toggle_nav.forEach((toggle)=>{
        toggle.addEventListener('click', e => {
            toggleClick(e);
        });
    });

    function toggleClick(e) {
    e.preventDefault();
    const toggle = e.target;
    const panel = toggle.nextElementSibling;
    
    toggle.classList.toggle('is-active');

    if (toggle.classList.contains('is-active')){
        panel.style.height = panel.scrollHeight + 'px';
    } else {
        panel.style.height = 0;
    }
    
    }
}

export {
    openCloseNav, subMenu
}