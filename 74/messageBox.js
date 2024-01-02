const pcs = (function () {
    function messageBox(message, buttons, callback) {
        
        const container = document.createElement('div');
        container.classList.add('message-box-container');

        
        const messageElement = document.createElement('p');
        messageElement.textContent = message;

        
        const buttonElements = buttons ? createButtons(buttons) : createDefaultButton();

        
        container.appendChild(messageElement);
        buttonElements.forEach(button => container.appendChild(button));

       
        document.body.appendChild(container);

       
        buttonElements.forEach((button, index) => {
            button.addEventListener('click', () => {
               
                if (callback) {
                    callback(buttons ? buttons[index] : 'OK');
                }
                
                document.body.removeChild(container);
            });
        });
    }

    function createButtons(buttons) {
        return buttons.map(buttonText => {
            const button = document.createElement('button');
            button.textContent = buttonText;
            return button;
        });
    }

    function createDefaultButton() {
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        return [okButton];
    }

    return {
        messageBox: messageBox
    };
})();
