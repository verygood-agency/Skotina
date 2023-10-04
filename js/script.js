const handleClickOrTouch = (element, callback) => {
    const touchendListener = (e) => {
        e.preventDefault();
        element.removeEventListener('touchend', touchendListener);
        callback(e);
    };
    element.addEventListener('click', callback);
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        element.addEventListener('touchend', touchendListener);
    });
};

document.addEventListener('DOMContentLoaded', function () {
    let showDialogButtons = document.querySelectorAll('.show-dialog');
    let targetClass = null;

    const setupBodyClickListener = () => {
        document.addEventListener('click', function listener(event) {
            if (!event.target.closest('.dialog-windows__item') || event.target.closest('.dialog-windows__close')) {
                document.body.classList.remove(targetClass);
                targetClass = null;
                document.removeEventListener('click', listener);
            }
        });
    };

    showDialogButtons.forEach(button => {
        handleClickOrTouch(button, function (event) {
            event.preventDefault();
            event.stopPropagation();
            targetClass = event.currentTarget.getAttribute('data-target');
            document.body.classList.add(targetClass);
            setupBodyClickListener();
        });
    });
});
