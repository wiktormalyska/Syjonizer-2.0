export function showOnlySelectedBlocksOn() {
    const selectedBlocks = JSON.parse(localStorage.getItem('selectedBlocks') || '[]');
    const blockData = [];

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection
    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement
        element.style.transition = 'all 0.2s';
        const checkbox = element.querySelector('.activity-checkbox') as HTMLInputElement;

        if (selectedBlocks.includes(String(i))) {
            const block = activityBlocks.item(i) as HTMLElement;

            blockData.push({
                id: i,
                left: block.style.left,
                width: block.style.width,
            })


            chrome.storage.local.get("isWeekendHidden", (data) => {
                if (data.isWeekendHidden === "true") {
                    element.style.width = '20%'
                    const leftValue = parseFloat(element.style.left);
                    element.style.left = `${Math.floor(leftValue / 20) * 20}%`;
                } else {
                    element.style.width = '14.2857%'
                    const leftValue = parseFloat(element.style.left);
                    element.style.left = `${Math.floor(leftValue / 14.2857) * 14.2857}%`;
                }
            });
            if (checkbox) {
                checkbox.disabled = true;
            }
            continue
        }
        element.style.opacity = '0';

        localStorage.setItem('blockData', JSON.stringify(blockData));
    }


}

export function showOnlySelectedBlocksOff() {
    const blockData = JSON.parse(localStorage.getItem('blockData') || '[]');

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection
    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement
        const checkbox = element.querySelector('.activity-checkbox') as HTMLInputElement;

        const data = blockData.find((block: { id: number, left: string, width: string }) => block.id === i);

        if (data) {
            element.style.left = data.left;
            element.style.width = data.width;
        }

        if (checkbox) {
            checkbox.disabled = false;
        }

        element.style.transition = 'all 0.2s';
        element.style.opacity = '1';
    }


}