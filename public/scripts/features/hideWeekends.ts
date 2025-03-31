export function weekendHiddenOn() {
    const percentage = 20
    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0] as HTMLElement
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.add("weekend-day-hidden")
    sunday.classList.add("weekend-day-hidden")

    const weekdayEntries = weekDaysContainerHeader.getElementsByClassName("weekdayentry") as HTMLCollection
    for (let i = 0; i < 5; i++) {
        const entry = weekdayEntries[i] as HTMLElement
        if (entry) {
            entry.style.left = (i * percentage) + "%"
            entry.style.width = percentage + "%"
        }
    }

    const verticalDividers = document.getElementsByClassName("planvline") as HTMLCollection
    for (let i = 6; i < 8; i++) {
        const divider = verticalDividers[i] as HTMLElement
        divider.classList.add("weekend-day-hidden")
    }

    for (let i = 0; i < 6; i++) {
        const divider = verticalDividers[i] as HTMLElement
        console.log(divider)
        divider.removeAttribute("style")
        divider.style.left = (i * percentage) + "%";
    }

    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = fiveDayColumnWidth / sevenDayColumnWidth;

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement

        if (element.style.left && element.style.width) {
            const leftStyle = parseFloat(element.style.left);
            const widthStyle = parseFloat(element.style.width);

            if (leftStyle !== 0) {
                element.style.left = (leftStyle * ratio) + "%";
            }
            element.style.width = (widthStyle * ratio) + "%";
        }
    }
    const selectedBlocks = JSON.parse(localStorage.getItem('selectedBlocks') || '[]');
    const blockData = [];
    for (let i = 0; i < activityBlocks.length; i++) {
        if (selectedBlocks.includes(String(i))) {
            const block = activityBlocks.item(i) as HTMLElement;

            blockData.push({
                id: i,
                left: block.style.left,
                width: block.style.width,
            })
        }
        localStorage.setItem('blockData', JSON.stringify(blockData));
    }
}

export function weekendHiddenOff() {
    const percentage = 14.2857

    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0] as HTMLElement
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.remove("weekend-day-hidden")
    sunday.classList.remove("weekend-day-hidden")

    const weekdayEntries = weekDaysContainerHeader.getElementsByClassName("weekdayentry") as HTMLCollection
    for (let i = 0; i < 5; i++) {
        const entry = weekdayEntries[i] as HTMLElement
        if (entry) {
            entry.style.left = (i * percentage) + "%"
            entry.style.width = percentage + "%"
        }
    }

    const verticalDividers = document.getElementsByClassName("planvline") as HTMLCollection
    for (let i = 6; i < 8; i++) {
        const divider = verticalDividers[i] as HTMLElement
        divider.classList.remove("weekend-day-hidden")
    }

    for (let i = 0; i < 6; i++) {
        const divider = verticalDividers[i] as HTMLElement
        divider.removeAttribute("style")
        divider.style.left = (i * percentage) + "%";
    }

    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = sevenDayColumnWidth / fiveDayColumnWidth;

    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement

        if (element.style.left && element.style.width) {
            const leftStyle = parseFloat(element.style.left);
            const widthStyle = parseFloat(element.style.width);

            if (leftStyle !== 0) {
                element.style.left = (leftStyle * ratio) + "%";
            }
            element.style.width = (widthStyle * ratio) + "%";
        }
    }
    const selectedBlocks = JSON.parse(localStorage.getItem('selectedBlocks') || '[]');
    const blockData = [];
    for (let i = 0; i < activityBlocks.length; i++) {
        if (selectedBlocks.includes(String(i))) {
            const block = activityBlocks.item(i) as HTMLElement;

            blockData.push({
                id: i,
                left: block.style.left,
                width: block.style.width,
            })
        }
        localStorage.setItem('blockData', JSON.stringify(blockData));
    }
}