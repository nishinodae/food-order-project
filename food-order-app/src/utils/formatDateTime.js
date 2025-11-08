const formatDateTime = (timestamp) => {
    const t = new Date(timestamp);

    const formatted = t.toLocaleString('en-MY', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return formatted;
};

export default formatDateTime;