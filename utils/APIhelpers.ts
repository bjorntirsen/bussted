export async function fetchBuslineData() {
    const response = await fetch("/api/busData");
    const data = await response.json();
    return data;
}

export async function fetchBusstopData() {
    const response = await fetch("/api/busstopData");
    const data = await response.json();
    return data;
}
