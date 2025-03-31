export function activityBlockPickingOn() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;
        block.id = String(i);

        block.addEventListener('mouseenter', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            if (checkboxContainer) {
                checkboxContainer.style.display = 'block';
            }
        });

        block.addEventListener('mouseleave', () => {
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
        checkboxContainer.style.zIndex = '1000';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'activity-checkbox';
        checkbox.dataset.blockId = String(i);

        checkbox.addEventListener('click', (e) => {
            console.log("block: " + i);
            e.stopPropagation();
        });

        const flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';
        flexContainer.className = 'flex-container';

        flexContainer.appendChild(checkboxContainer);
        const subject = topSection.querySelector('.subject');
        if (subject) {
            flexContainer.appendChild(subject);
        }

        checkboxContainer.appendChild(checkbox);


        topSection.insertBefore(flexContainer, topSection.firstChild);
        const brElement = block.getElementsByTagName("br")[0]
        brElement.style.display = 'none';
    }
}

export function activityBlockPickingOff() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;

        block.removeEventListener('mouseenter', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            if (checkboxContainer) {
                checkboxContainer.style.display = 'block';
            }
        });
        block.removeEventListener('mouseleave', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            const checkbox = checkboxContainer?.querySelector('.activity-checkbox') as HTMLInputElement;

            if (checkboxContainer && !checkbox.checked) {
                checkboxContainer.style.display = 'none';
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