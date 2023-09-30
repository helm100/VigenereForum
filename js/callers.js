const rootfolder = "./";

export function sendMessage(chnlId, message) {

    return fetch(rootfolder + "sendMessage.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `channelId=${chnlId}&message=${encodeURIComponent(message)}`
    })
        .then((response) => {
            return response.text();
        })
}

export function getMessages(chnlId) {
    return fetch(rootfolder + "getMessages.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `channelId=${chnlId}`
    })
        .then((response) => {
            return response.text();
        })
        .then((res) => {
            return JSON.parse(res);
        });
}

export function getChannelId(channelName) {
    return fetch(rootfolder + "getChannelId.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `channelName=${encodeURIComponent(channelName)}`
    })
        .then((response) => {
            return response.text();
        })
        .then((res) => {
            return Number(res);
        });
}

export function getUsageInfo(password) {
    return fetch(rootfolder + "getUsageInfo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: `password=${password}`
    })
        .then((response) => {
            return response.text();
        });
}