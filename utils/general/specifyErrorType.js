
// 0 -> execution aborted (timeout = 5s)
// 1 -> err: max fee per gas less than block base fee
// 2 -> execution reverted

// default -> return 2

function specifyErrorType(errorText){
    let timeOut5s = "Error: Returned error: execution aborted (timeout = 5s)";
    let maxFee = "err: max fee per gas less than block base fee";
    let revert = "execution reverted";
    if(errorText.includes(timeOut5s)){
        return 0;
    }
    if(errorText.includes(maxFee)){
        return 1;
    }
    if(errorText.includes(revert)){
        return 2;
    }
    return 2
}

module.exports = specifyErrorType