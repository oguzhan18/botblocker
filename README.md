# SimpleCaptcha

SimpleCaptcha is a lightweight CAPTCHA library designed to be easy to integrate into any website. It provides multiple CAPTCHA types including text, emojis, letters, colors, and shapes. This documentation will guide you through the installation, configuration, and usage of SimpleCaptcha.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [HTML Setup](#html-setup)
  - [JavaScript Initialization](#javascript-initialization)
  - [Configuration Options](#configuration-options)
- [CAPTCHA Types](#captcha-types)
  - [Text CAPTCHA](#text-captcha)
  - [Emoji CAPTCHA](#emoji-captcha)
  - [Letter CAPTCHA](#letter-captcha)
  - [Color CAPTCHA](#color-captcha)
  - [Shape CAPTCHA](#shape-captcha)
- [Example](#example)
- [License](#license)

## Installation

To use SimpleCaptcha, include the CSS and JavaScript files from the CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/simplecaptcha/captcha.js" defer></script>
````

# Usage
## HTML Setup
Add the following script to your HTML file to initialize SimpleCaptcha:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usage CAPTCHA</title>
    <script src="https://cdn.jsdelivr.net/gh/yourusername/simplecaptcha/captcha.js" defer></script>
</head>
<body>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeCaptcha({
                type: 'emoji', // Change this to 'text', 'letters', 'colors', or 'shapes' to switch CAPTCHA type
                cssPath: 'https://cdn.jsdelivr.net/gh/yourusername/simplecaptcha/captcha.css',
                canvasId: 'captcha',
                inputId: 'captcha-input',
                buttonId: 'captcha-submit',
                checkboxContainerId: 'robot-checkbox-container',
                modalOverlayId: 'modal-overlay',
                captchaContainerId: 'captcha-container'
            });
        });
    </script>
</body>
</html>
```
## JavaScript Initialization

The `initializeCaptcha` function is called when the document is fully loaded. It requires an options object to configure the CAPTCHA.
## Configuration Options
* `type`: Specifies the type of CAPTCHA (text, emoji, letters, colors, shapes).
* `cssPath`: Path to the CSS file.
* `canvasId`: D of the CAPTCHA canvas element.
* `inputId`: ID of the input element for the CAPTCHA.
* `buttonId`: ID of the submit button for the CAPTCHA form.
* `checkboxContainerId`: ID of the container for the "I'm not a robot" checkbox.
* `modalOverlayId`: ID of the modal overlay element.
* `captchaContainerId`: ID of the CAPTCHA container element.

# CAPTCHA Types
## Text CAPTCHA
Generates a CAPTCHA with random alphanumeric characters.
## Emoji CAPTCHA
Generates a CAPTCHA with random emojis.
## Letter CAPTCHA
Generates a CAPTCHA with random letters.
## Color CAPTCHA
Generates a CAPTCHA with random colors. Users need to select the correct colors from a palette.
## Shape CAPTCHA
Generates a CAPTCHA with random shapes. Users need to select the correct shapes from a palette.
# Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Usage</title> 
    <script src="https://cdn.jsdelivr.net/gh/yourusername/simplecaptcha/captcha.js" defer></script>
</head>
<body>
    <div id="robot-checkbox-container"></div>
    <div id="modal-overlay">
        <div id="captcha-container">
            <canvas id="captcha" width="200" height="60"></canvas>
            <form id="captcha-form">
                <input type="text" id="captcha-input" placeholder="Enter the code">
                <button type="submit" id="captcha-submit">Submit</button>
            </form>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeCaptcha({
                type: 'emoji',
                cssPath: 'https://cdn.jsdelivr.net/gh/yourusername/simplecaptcha/captcha.css',
                canvasId: 'captcha',
                inputId: 'captcha-input',
                buttonId: 'captcha-submit',
                checkboxContainerId: 'robot-checkbox-container',
                modalOverlayId: 'modal-overlay',
                captchaContainerId: 'captcha-container'
            });
        });
    </script>
</body>
</html>
```
