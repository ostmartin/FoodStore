export {modal};
export {openModalWindow, closeModal};

let modalOpened = false;

function openModalWindow(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    modalOpened = true;
    
    if (modalTimer) {
        clearInterval(modalTimer);
    }
    /* -------------------------------------------------- */

    // window.removeEventListener('scroll', showModalByScroll);

    /* --------------------------------------------------- */
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)

    modal.classList.remove('show');
    modal.classList.add('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
    const modalTrigger = document.querySelectorAll(triggerSelector); /* '[data-modal]' */
    
    const modalWindow = document.querySelector(modalSelector); /* '.modal' */
    

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimer));
    })

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target === modalWindow || target.hasAttribute('data-close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    function showModalByScroll() {
        if (((document.documentElement.clientHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) && !modalOpened) {
            openModalWindow(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;