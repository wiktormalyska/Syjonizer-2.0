export function showOnlySelectedBlocksOn() {
    function getPageCode(): string {
        const urlParts = window.location.pathname.split('/').filter(Boolean);
        return urlParts.pop() || 'default';
    }

    const pageCode = getPageCode();
    const selectedBlocksKey = `selectedBlocks_${pageCode}`;
    const blockDataKey = `blockData_${pageCode}`;

    const selectedBlocks = JSON.parse(localStorage.getItem(selectedBlocksKey) || '[]');
    const blockData = [];

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection;

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement;
        element.style.transition = 'all 0.2s';
        const checkbox = element.querySelector('.activity-checkbox') as HTMLInputElement | null;

        if (selectedBlocks.includes(String(i))) {
            const block = activityBlocks.item(i) as HTMLElement;

            blockData.push({
                id: i,
                left: block.style.left,
                width: block.style.width,
            });

            chrome.storage.local.get("isWeekendHidden", (data) => {
                if (data.isWeekendHidden === "true") {
                    element.style.width = '20%';
                    const leftValue = parseFloat(element.style.left);
                    element.style.left = `${Math.floor(leftValue / 20) * 20}%`;
                } else {
                    element.style.width = '14.2857%';
                    const leftValue = parseFloat(element.style.left);
                    element.style.left = `${Math.floor(leftValue / 14.2857) * 14.2857}%`;
                }
            });

            if (checkbox) {
                checkbox.disabled = true;
            }
            continue;
        }

        element.style.opacity = '0';
    }

    localStorage.setItem(blockDataKey, JSON.stringify(blockData));
}

export function showOnlySelectedBlocksOff() {
    function getPageCode(): string {
        const urlParts = window.location.pathname.split('/').filter(Boolean);
        return urlParts.pop() || 'default';
    }

    const pageCode = getPageCode();
    const blockDataKey = `blockData_${pageCode}`;

    const blockData = JSON.parse(localStorage.getItem(blockDataKey) || '[]');

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection;

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement;
        const checkbox = element.querySelector('.activity-checkbox') as HTMLInputElement | null;

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