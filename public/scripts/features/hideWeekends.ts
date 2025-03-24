export function weekendHiddenOn() {
    const percentage = 20
    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0] as HTMLElement
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.add("weekend-day-hidden")
    sunday.classList.add("weekend-day-hidden")

    resizeWeekdayHeaders(percentage, weekDaysContainerHeader)
    modifyVerticalDividers(percentage, true)

    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = fiveDayColumnWidth / sevenDayColumnWidth;
    resizeActivityBlocks(ratio)
}

export function weekendHiddenOff() {
    const percentage = 14.2857

    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0] as HTMLElement
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.remove("weekend-day-hidden")
    sunday.classList.remove("weekend-day-hidden")

    resizeWeekdayHeaders(percentage, weekDaysContainerHeader)
    modifyVerticalDividers(percentage, false)


    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = sevenDayColumnWidth / fiveDayColumnWidth;
    resizeActivityBlocks(ratio)
}

function modifyVerticalDividers(percentage: number, hide: boolean) {
    const verticalDividers = document.getElementsByClassName("planvline") as HTMLCollection
    for (let i = 6; i < 8; i++) {
        const divider = verticalDividers[i] as HTMLElement
        if (hide) {
            divider.classList.remove("weekend-day-hidden")
        } else {
            divider.classList.add("weekend-day-hidden")
        }
    }

    for (let i = 0; i < 6; i++) {
        const divider = verticalDividers[i] as HTMLElement
        console.log(divider)
        divider.removeAttribute("style")
        divider.style.left = (i * percentage) + "%";
    }
}

function resizeWeekdayHeaders(percentage: number, weekDaysContainerHeader: HTMLElement) {
    const weekdayEntries = weekDaysContainerHeader.getElementsByClassName("weekdayentry") as HTMLCollection
    for (let i = 0; i < 5; i++) {
        const entry = weekdayEntries[i] as HTMLElement
        if (entry) {
            entry.style.left = (i * percentage) + "%"
            entry.style.width = percentage + "%"
        }
    }
}

function resizeActivityBlocks(ratio:number) {
    const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection


    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i] as HTMLElement

        // Only process elements with style properties
        if (element.style.left && element.style.width) {
            const leftStyle = parseFloat(element.style.left);
            const widthStyle = parseFloat(element.style.width);

            if (leftStyle !== 0) {
                element.style.left = (leftStyle * ratio) + "%";
            }
            element.style.width = (widthStyle * ratio) + "%";
        }
    }
}

//TODO: Fix u undefined na wtyczce