// Получаем модальное окно по id. На страницах без окна будет null.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать», если окно на странице есть.
if (orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Получаем название товара из data-атрибута.
            const productName = button.dataset.product;

            // Записываем название товара в скрытое поле формы.
            if (selectedProductInput) {
                selectedProductInput.value = productName;
            }

            // Открываем модальное окно.
            orderDialog.showModal();
        });
    });
}

// Закрываем модальное окно по кнопке «Закрыть».
if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

// Получаем форму заявки (на главной, в каталоге, на странице товара и в контактах).
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        // Отменяем стандартную отправку формы,
        // потому что backend пока не подключён.
        event.preventDefault();

        // Сбрасываем предыдущие признаки ошибок.
        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        // Проверяем встроенные HTML-ограничения формы.
        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            // Показываем стандартные сообщения браузера.
            orderForm.reportValidity();
            return;
        }

        // Показываем сообщение об успешной отправке.
        if (successMessage) {
            successMessage.hidden = false;
            successMessage.focus?.();
        }

        // Очищаем форму.
        orderForm.reset();

        // Закрываем модальное окно, если оно открыто.
        if (orderDialog && orderDialog.open) {
            orderDialog.close();
        }
    });
}
