import type { NextApiRequest, NextApiResponse } from "next";

// Data shapes from API
interface busstopsAPIObj {
    ResponseData: {
        Result: busstopObj[];
    };
}

export interface busstopObj {
    StopPointNumber: string;
    StopPointName: string;
    LocationNorthingCoordinate: string;
    LocationEastingCoordinate: string;
}

async function fetchAndProcessBusstops(): Promise<busstopObj[]> {
    const response = await fetch(
        `https://api.sl.se/api2/LineData.json?model=stop&key=${process.env.API_KEY}`
    );
    const busstops = await response.json();
    const busstopArray = (busstops as busstopsAPIObj).ResponseData.Result;
    return busstopArray;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<busstopObj[]>
) {
    const processedBusstops = await fetchAndProcessBusstops();
    res.status(200).json(processedBusstops);
}
