(function() {
    'use strict';

    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.debug('Text copy ' + msg + ':', text);
        } catch (err) {
            console.error('Failed to copy text to clipboard:', err);
        }

        document.body.removeChild(textArea);
    }

    function wrapElement(element) {
        var text = element.textContent.trim();
        var anchor = document.createElement('a');
        anchor.href = '#';
        anchor.textContent = text;
        anchor.classList.add('scene-title-to-clipboard');
        anchor.title = 'Copy title to clipboard';
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            copyToClipboard(text);
        });
        element.innerHTML = '';
        element.appendChild(anchor);
    }

    // Handle mutations
    function handleMutations(mutationsList, observer) {
        for(const mutation of mutationsList) {
            for(const addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.querySelector('.scene-header div.TruncatedText')) {
                    wrapElement(addedNode.querySelector('.scene-header div.TruncatedText'));
                }
            }
        }
    }

    // Create a mutation observer instance
    const observer = new MutationObserver(handleMutations);

    // Start observing the target node for configured mutations
    observer.observe(document.body, { childList: true, subtree: true });
})();
