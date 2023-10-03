document.addEventListener('DOMContentLoaded', function () {
  let showDialogButtons = document.querySelectorAll('.show-dialog');
  let targetClass = null;

  const setupBodyClickListener = () => {
      document.addEventListener('click', function listener(event) {
          if (!event.target.closest('.dialog-windows__item') || event.target.closest('.dialog-windows__close')) {
              document.body.classList.remove(targetClass);
              targetClass = null;
              // Удаляем обработчик, чтобы избежать повторного удаления класса в будущем
              document.removeEventListener('click', listener);
          }
      });
  };

  showDialogButtons.forEach(button => {
      button.addEventListener('click', function (event) {
          event.preventDefault();
          // Предотвращаем всплытие события
          event.stopPropagation();
          targetClass = event.currentTarget.getAttribute('data-target');
          document.body.classList.add(targetClass);
          setupBodyClickListener();
      });
  });
});
