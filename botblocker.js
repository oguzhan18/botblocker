class BotBlocker {
    constructor(options) {
        this.options = options || {};
        this.loadCSS(this.options.cssPath || 'botblocker.css');
        
        this.type = this.options.type || 'text';
        this.canvasId = this.options.canvasId || 'captcha';
        this.inputId = this.options.inputId || 'captcha-input';
        this.buttonId = this.options.buttonId || 'captcha-submit';
        this.checkboxContainerId = this.options.checkboxContainerId || 'robot-checkbox-container';
        this.modalOverlayId = this.options.modalOverlayId || 'modal-overlay';
        this.captchaContainerId = this.options.captchaContainerId || 'captcha-container';

        this.createDOMElements();
        this.initialize();
    }

    loadCSS(filename) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = filename;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    createDOMElements() {
        const body = document.body;
        const checkboxContainer = document.createElement('div');
        checkboxContainer.id = this.checkboxContainerId;
        body.appendChild(checkboxContainer);

        const modalOverlay = document.createElement('div');
        modalOverlay.id = this.modalOverlayId;
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'none';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        body.appendChild(modalOverlay);

        const captchaContainer = document.createElement('div');
        captchaContainer.id = this.captchaContainerId;
        captchaContainer.style.display = 'none';
        captchaContainer.style.textAlign = 'center';
        captchaContainer.style.padding = '20px';
        captchaContainer.style.backgroundColor = 'white';
        captchaContainer.style.border = '1px solid #ddd';
        captchaContainer.style.borderRadius = '5px';
        captchaContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        
        modalOverlay.appendChild(captchaContainer);

        const canvas = document.createElement('canvas');
        canvas.id = this.canvasId;
        canvas.width = 200;
        canvas.height = 60;
        canvas.style.display = 'block';
        canvas.style.margin = '20px auto';
        canvas.style.border = '1px solid #ddd';
        canvas.style.borderRadius = '5px';
        captchaContainer.appendChild(canvas);
        const form = document.createElement('form');
        form.id = 'captcha-form';

        captchaContainer.appendChild(form);
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.id = this.inputId;
        this.input.placeholder = 'Enter the code';
        this.input.style.width = 'calc(100% - 22px)';
        this.input.style.padding = '10px';
        this.input.style.marginBottom = '10px';
        this.input.style.border = '1px solid #ddd';
        this.input.style.borderRadius = '5px';

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.id = this.buttonId;
        submitButton.textContent = 'Submit';
        submitButton.style.display = 'inline-block';
        submitButton.style.padding = '10px 20px';
        submitButton.style.backgroundColor = '#4CAF50';
        submitButton.style.color = 'white';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '5px';
        submitButton.style.cursor = 'pointer';
        form.appendChild(submitButton);

        submitButton.addEventListener('mouseover', () => {
            submitButton.style.backgroundColor = '#45a049';
        });

        submitButton.addEventListener('mouseout', () => {
            submitButton.style.backgroundColor = '#4CAF50';
        });

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.form = form;
        this.captchaContainer = captchaContainer;
        this.checkboxContainer = checkboxContainer;
        this.modalOverlay = modalOverlay;
    }

    initialize() {
        this.createCheckbox();
        this.form.addEventListener('submit', (event) => this.validateCaptcha(event));
    }

    createCheckbox() {
        const checkboxDiv = document.createElement('div');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.id = 'robot-checkbox-input';
        const label = document.createElement('label');
        label.htmlFor = 'robot-checkbox-input';
        label.textContent = ' I\'m not a robot';
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(label);
        this.checkboxContainer.appendChild(checkboxDiv);

        checkboxInput.addEventListener('change', () => {
            if (checkboxInput.checked) {
                this.modalOverlay.style.display = 'flex';
                this.captchaContainer.style.display = 'block';
                this.generateCaptcha();
            } else {
                this.modalOverlay.style.display = 'none';
                this.captchaContainer.style.display = 'none';
            }
        });

        this.checkbox = checkboxInput;
    }

    generateCaptcha() {
        this.clearInput();
        this.clearOptions();
        switch (this.type) {
            case 'emoji':
                this.generateEmojiCaptcha();
                break;
            case 'letters':
                this.generateLetterCaptcha();
                break;
            case 'colors':
                this.generateColorCaptcha();
                break;
            case 'shapes':
                this.generateShapeCaptcha();
                break;
            default:
                this.generateTextCaptcha();
                break;
        }
    }

    generateTextCaptcha() {
        this.captchaCode = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            this.captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(this.captchaCode, 50, 40);

        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.strokeStyle = '#ddd';
            this.ctx.stroke();
        }

        this.form.insertBefore(this.input, this.form.firstChild);
    }

    generateEmojiCaptcha() {
        this.captchaCode = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const emojis = '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘';
        for (let i = 0; i < 4; i++) {
            this.captchaCode += emojis.charAt(Math.floor(Math.random() * emojis.length));
        }

        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(this.captchaCode, 50, 40);

        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.strokeStyle = '#ddd';
            this.ctx.stroke();
        }

        const emojiContainer = document.createElement('div');
        emojiContainer.id = 'captcha-options';
        emojiContainer.style.display = 'flex';
        emojiContainer.style.flexWrap = 'wrap';
        for (const emoji of emojis) {
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = emoji;
            emojiSpan.style.fontSize = '30px';
            emojiSpan.style.cursor = 'pointer';
            emojiSpan.style.margin = '5px';
            emojiSpan.addEventListener('click', () => {
                this.input.value += emoji;
            });
            emojiContainer.appendChild(emojiSpan);
        }
        this.form.insertBefore(emojiContainer, this.form.firstChild);
        this.form.insertBefore(this.input, this.form.firstChild);
    }

    generateLetterCaptcha() {
        this.captchaCode = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 6; i++) {
            this.captchaCode += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(this.captchaCode, 50, 40);

        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.strokeStyle = '#ddd';
            this.ctx.stroke();
        }

        this.form.insertBefore(this.input, this.form.firstChild);
    }

    generateColorCaptcha() {
        this.captchaCode = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        this.selectedColors = [];
        for (let i = 0; i < 3; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.selectedColors.push(color);
            this.ctx.fillStyle = color;
            this.ctx.fillRect(20 + (i * 60), 10, 50, 40);
        }

        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.strokeStyle = '#ddd';
            this.ctx.stroke();
        }

        const colorContainer = document.createElement('div');
        colorContainer.id = 'captcha-options';
        colorContainer.style.display = 'flex';
        colorContainer.style.flexWrap = 'wrap';
        const colorOptions = colors.map(color => {
            const colorBox = document.createElement('div');
            colorBox.style.display = 'inline-block';
            colorBox.style.width = '30px';
            colorBox.style.height = '30px';
            colorBox.style.margin = '5px';
            colorBox.style.backgroundColor = color;
            colorBox.style.cursor = 'pointer';
            colorBox.addEventListener('click', () => {
                this.input.value += color + ' ';
            });
            return colorBox;
        });
        colorOptions.forEach(option => colorContainer.appendChild(option));
        this.form.insertBefore(colorContainer, this.form.firstChild);
        this.form.insertBefore(this.input, this.form.firstChild);
    }

    generateShapeCaptcha() {
        this.captchaCode = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const shapes = ['circle', 'square', 'triangle'];
        this.selectedShapes = [];
        for (let i = 0; i < 3; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            this.selectedShapes.push(shape);
            this.drawShape(shape, 40 + (i * 60), 30);
        }

        for (let i = 0; i < 100; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.strokeStyle = '#ddd';
            this.ctx.stroke();
        }

        const shapeContainer = document.createElement('div');
        shapeContainer.id = 'captcha-options';
        shapeContainer.style.display = 'flex';
        shapeContainer.style.flexWrap = 'wrap';
        const shapeOptions = shapes.map(shape => {
            const shapeBox = document.createElement('canvas');
            shapeBox.width = 30;
            shapeBox.height = 30;
            shapeBox.style.display = 'inline-block';
            shapeBox.style.margin = '5px';
            shapeBox.style.cursor = 'pointer';
            this.drawShape(shape, 15, 15, shapeBox.getContext('2d'));
            shapeBox.addEventListener('click', () => {
                this.input.value += shape + ' ';
            });
            return shapeBox;
        });
        shapeOptions.forEach(option => shapeContainer.appendChild(option));
        this.form.insertBefore(shapeContainer, this.form.firstChild);
        this.form.insertBefore(this.input, this.form.firstChild);
    }

    drawShape(shape, x, y, ctx = this.ctx) {
        ctx.beginPath();
        switch (shape) {
            case 'circle':
                ctx.arc(x, y, 15, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.rect(x - 15, y - 15, 30, 30);
                break;
            case 'triangle':
                ctx.moveTo(x, y - 15);
                ctx.lineTo(x - 15, y + 15);
                ctx.lineTo(x + 15, y + 15);
                ctx.closePath();
                break;
        }
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    validateCaptcha(event) {
        event.preventDefault();
        if (!this.checkbox.checked) {
            console.log('Please confirm you are not a robot.');
            return;
        }
        let inputCode = this.input.value.trim();
        let isValid = false;
        switch (this.type) {
            case 'emoji':
            case 'letters':
            case 'text':
                isValid = inputCode === this.captchaCode;
                break;
            case 'colors':
                isValid = this.validateColorCaptcha(inputCode);
                break;
            case 'shapes':
                isValid = this.validateShapeCaptcha(inputCode);
                break;
        }
        if (!isValid) {
            console.log('Validation failed.');
            this.clearInput();
            this.generateCaptcha();
        } else {
            console.log('Validation successful.');
            this.removeCheckbox();
            this.closeModal();
        }
    }

    validateColorCaptcha(inputCode) {
        const inputColors = inputCode.trim().split(' ');
        return inputColors.every(color => this.selectedColors.includes(color.trim()));
    }

    validateShapeCaptcha(inputCode) {
        const inputShapes = inputCode.trim().split(' ');
        return inputShapes.every(shape => this.selectedShapes.includes(shape.trim()));
    }

    clearInput() {
        this.input.value = '';
    }

    clearOptions() {
        const optionsContainer = document.getElementById('captcha-options');
        if (optionsContainer) {
            optionsContainer.remove();
        }
    }

    removeCheckbox() {
        this.checkboxContainer.innerHTML = '';
    }

    closeModal() {
        this.modalOverlay.style.display = 'none';
        this.captchaContainer.style.display = 'none';
    }
}

function initializeBotBlocker(options) {
    new BotBlocker(options);
}
