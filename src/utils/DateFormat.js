
export const formatDate = (dateString) => {
    const options = {
        weekday: 'long', // Full day name (e.g., Monday)
        year: 'numeric', // Full numeric year (e.g., 2024)
        month: 'long', // Full month name (e.g., March)
        day: '2-digit', // Two-digit day (e.g., 04)
    };

    // Create a Date object from the dateString
    const date = new Date(dateString);
    // Use Intl.DateTimeFormat to format the date according to the options
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

