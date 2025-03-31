export function activityBlockPickingOn() {
    const activityBlocks = document.getElementsByClassName('activity_block');
    for (let i = 0; i < activityBlocks.length; i++) {
        const block = activityBlocks.item(i) as HTMLElement;
        block.id = String(i)

        block.addEventListener('mouseenter', () => {
            const topSection = block.querySelector('.activity_block_top');
            const checkboxContainer = topSection?.querySelector('.activity-checkbox-container') as HTMLElement;
            if (checkboxContainer) {
                checkboxContainer.style.display = 'block';
            }
        })

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
        // checkboxContainer.style.position = 'absolute';
        checkboxContainer.style.marginRight = '5px';
        checkboxContainer.style.display = 'none';
        checkboxContainer.style.zIndex = '1000';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'activity-checkbox';
        checkbox.dataset.blockId = String(i);

        checkbox.addEventListener('click', (e) => {
            console.log("block: "+i)
            e.stopPropagation();
        });

        const flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';

        checkboxContainer.appendChild(checkbox);

        flexContainer.appendChild(checkboxContainer);

        while (topSection.firstChild) {
            flexContainer.appendChild(topSection.firstChild);
        }

        topSection.appendChild(flexContainer);
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
        const checkboxContainer = topSection?.querySelector('.activity-checkbox-container');
        if (checkboxContainer && topSection) {
            topSection.removeChild(checkboxContainer);
        }

        block.removeAttribute("id");
    }
}