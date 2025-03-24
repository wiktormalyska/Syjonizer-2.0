export function alternativeStyleOn() {
    const activityBlocks = document.getElementsByClassName("activity_block")
    if (activityBlocks.length <= 0) {
        return
    }
    for (let i = 0; i < activityBlocks.length; i++) {
        const activityBlock = activityBlocks[i]
        activityBlock.classList.add("alternative-style-activity-block")
    }
}

export function alternativeStyleOff() {
    const activityBlocks = document.getElementsByClassName("activity_block")
    if (activityBlocks.length <= 0) {
        return
    }
    for (let i = 0; i < activityBlocks.length; i++) {
        const activityBlock = activityBlocks[i]
        activityBlock.classList.remove("alternative-style-activity-block")
    }
}