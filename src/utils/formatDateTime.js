const formatDateTime = () => {
    const now = new Date(Date.now());

    const formatted = now.toLocaleString('en-MY', {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return formatted;
}

export default formatDateTime;