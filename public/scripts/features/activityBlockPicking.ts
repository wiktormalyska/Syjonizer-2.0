export function activityBlockPickingOn() {
    function getPageCode(): string {
        const urlParts = window.location.pathname.split('/').filter(Boolean);
        return urlParts.pop() || 'default';
    }

    const pageCode = getPageCode();
    // Dynamiczny klucz dla konkretnego URL
    const selectedBlocksKey = `selectedBlocks_${pageCode}`;

    const activityBlocks = document.getElementsByClassName('activity_block');
    // Pobieranie danych ze zaktualizowanego klucza
    let selectedBlocks = JSON.parse(localStorage.getItem(selectedBlocksKey) || '[]');

    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;
        block.id = String(i);

        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.width = '100%';
        label.style.cursor = 'pointer';
        label.style.zIndex = '10000';

        block.parentNode?.insertBefore(label, block);
        label.appendChild(block);

        block.addEventListener('pointerenter', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            if (checkboxContainer) {
                checkboxContainer.style.display = 'block';
            }
        });

        block.addEventListener('pointerleave', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            const checkbox = checkboxContainer?.querySelector('.activity-checkbox') as HTMLInputElement;

            if (checkboxContainer && !checkbox.checked) {
                checkboxContainer.style.display = 'none';
            }
        });

        const topSection = block.querySelector('.activity_block_top') as HTMLElement;
        if (!topSection) continue;

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('activity-checkbox-container');
        checkboxContainer.style.marginRight = '5px';
        checkboxContainer.style.display = 'none';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'activity-checkbox';
        checkbox.dataset.blockId = String(i);

        if (selectedBlocks.includes(String(i))) {
            checkbox.checked = true;
            checkboxContainer.style.display = 'block';
        }

        checkbox.addEventListener('click', () => {
            const blockId = block.id;

            if (checkbox.checked) {
                if (!selectedBlocks.includes(blockId)) {
                    selectedBlocks.push(blockId);
                }
            } else {
                selectedBlocks = selectedBlocks.filter((id: string) => id !== blockId);
            }

            // Zapis do zaktualizowanego klucza
            localStorage.setItem(selectedBlocksKey, JSON.stringify(selectedBlocks));
        });

        checkboxContainer.appendChild(checkbox);

        const flexContainer = document.createElement('div');
        // DODANO KLASĘ, by móc usunąć ten element w funkcji Off
        flexContainer.classList.add('activity-flex-container');
        flexContainer.style.display = 'flex';

        flexContainer.appendChild(checkboxContainer);
        flexContainer.appendChild(topSection.querySelector('.subject') as HTMLElement);

        topSection.insertBefore(flexContainer, topSection.firstChild);
        const brElement = block.getElementsByTagName("br")[0];
        if (brElement) {
            brElement.style.display = 'none';
        }
    }
}

export function activityBlockPickingOff() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;

        block.removeEventListener('pointerenter', () => { /* ... */ });
        block.removeEventListener('pointerleave', () => { /* ... */ });

        chrome.storage.local.get("isAlternativeStyle", (data) => {
            if (data.isAlternativeStyle === "true") {
                block.classList.add('alternative-style-activity-block');
            }
        });

        const topSection = block.querySelector('.activity_block_top') as HTMLElement;
        if (!topSection) continue;

        // POPRAWKA DOM: Szukanie po właściwej klasie i bezpieczne wyciąganie elementu .subject
        const flexContainer = topSection.querySelector('.activity-flex-container') as HTMLElement;
        if (flexContainer) {
            const subject = flexContainer.querySelector('.subject') as HTMLElement;
            if (subject) {
                topSection.insertBefore(subject, topSection.firstChild);
            }
            flexContainer.remove();
        }

        const brElement = block.getElementsByTagName("br")[0];
        if (brElement) {
            brElement.style.display = 'block';
        }

        block.removeAttribute("id");
    }
}