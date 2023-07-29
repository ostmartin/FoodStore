export {tabs};

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), /* '.tabheader__item' */
          tabsContent = document.querySelectorAll(tabsContentSelector), /* '.tabcontent' */
          tabsParent = document.querySelector(tabsParentSelector), /* '.tabcontainer' */
          tabsArr= Array.from(tabs);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass); /* 'tabheader__item_active' */
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')){
            // hideTabContent();
            // showTabContent(tabsArr.indexOf(target));
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

// module.exports = tabs;