(function () {
    let buttonCounter = 1;

    function createButton() {
        const newButton = document.createElement('button');
        newButton.innerText = buttonCounter++;
        newButton.addEventListener('click', createButton);

      
        document.body.appendChild(newButton);
    }

    document.getElementById('startButton').addEventListener('click', createButton);
})();
