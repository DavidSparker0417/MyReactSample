
const processData = (data) => {
    const result = Object.keys(data.intraday).reduce((acc, current) => {
        const other = data.intraday[current];
        const open = Number.parseFloat(other.open);
        const close = Number.parseFloat(other.close);
        const high = Number.parseFloat(other.high);
        const low = Number.parseFloat(other.low);
        const volume = Number.parseInt(other.volume);
        const formatedDate = `/Date(${new Date(current).getTime})/`;
        const change = (((close - open) / close) * 1);
        const color =  change >= 0 ? '#58B854' : '#D9534F';
        return [...acc, {
                open,
                close,
                high,
                low,
                volume,
                formatedDate,
                change: Math.abs(change),
                color,
                date: new Date(current),
                timestamp: new Date(current).getTime()
            }]
    }, [])

    return result;
}

export const dataService = {
    getSymbol: async(symbol) => {
        const resp = await fetch(`${process.env.PUBLIC_URL}/data/symbols/${symbol}1D.json`);
        const data = await resp.json();
        return processData(data);
    }
}