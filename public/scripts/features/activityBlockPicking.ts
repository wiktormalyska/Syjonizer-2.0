export function activityBlockPickingOn() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    let selectedBlocks = JSON.parse(localStorage.getItem('selectedBlocks') || '[]');

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
            const blockId = block.id

            if (checkbox.checked) {
                if (!selectedBlocks.includes(blockId)) {
                    selectedBlocks.push(blockId);
                }
            } else {
                selectedBlocks = selectedBlocks.filter((id: string) => id !== blockId);
            }

            localStorage.setItem('selectedBlocks', JSON.stringify(selectedBlocks));
        });
        checkboxContainer.appendChild(checkbox);

        const flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';

        flexContainer.appendChild(checkboxContainer);
        flexContainer.appendChild(topSection.querySelector('.subject') as HTMLElement);

        topSection.insertBefore(flexContainer, topSection.firstChild);
        const brElement = block.getElementsByTagName("br")[0]
        brElement.style.display = 'none';
    }
}

export function activityBlockPickingOff() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;

        block.removeEventListener('pointerenter', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            if (checkboxContainer) {
                checkboxContainer.style.display = 'block';
            }
        });
        block.removeEventListener('pointerleave', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            const checkbox = checkboxContainer?.querySelector('.activity-checkbox') as HTMLInputElement;

            if (checkboxContainer && !checkbox.checked) {
                checkboxContainer.style.display = 'none';
            }
        });

        chrome.storage.local.get("isAlternativeStyle", (data) => {
            if (data.isAlternativeStyle === "true") {
                block.classList.add('alternative-style-activity-block');
            }
        });

        const topSection = block.querySelector('.activity_block_top') as HTMLElement;
        if (!topSection) continue;

        const subject = topSection!.querySelector('.subject') as HTMLElement;
        const flexContainer = topSection!.querySelector('.flex-container') as HTMLElement;
        flexContainer.remove();

        const brElement = document.getElementsByTagName("br")[0]
        if (brElement) {
            brElement.style.display = 'block';
        }
        topSection.insertBefore(subject, topSection.firstChild);


        block.removeAttribute("id");
    }
}