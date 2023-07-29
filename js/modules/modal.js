export {modal};

function modal() {
    const contactUsBtns = document.querySelectorAll('[data-modal]');
    
    const modalWindow = document.querySelector('.modal');
    

    contactUsBtns.forEach(btn => {
        btn.addEventListener('click', openModalWindow);
    })

    modalWindow.addEventListener('click', closeWindow);

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);

        /* -------------------------------------------------- */

        window.removeEventListener('scroll', showModalByScroll);

        /* --------------------------------------------------- */
    }

    function closeWindow(e) {
        let target = e.target;
        
        if (target && (target === this || target.hasAttribute('data-close'))) {
            closeModal();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    })

    function closeModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }

    let modalTimer = setTimeout(openModalWindow, 60000);

    function showModalByScroll() {
        if ((document.documentElement.clientHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;