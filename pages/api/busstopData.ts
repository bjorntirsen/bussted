import type { NextApiRequest, NextApiResponse } from "next";

// Data shapes from API
interface busstopsAPIObj {
    ResponseData: {
        Result: busstopObj[];
    };
}

interface busstopObj {
    StopPointNumber: string;
    StopPointName: string;
    LocationNorthingCoordinate: string;
    LocationEastingCoordinate: string;
}

// My data shapes
export interface processedBusstopObj {
    [stopPointNumber: string]: {
        stopPointName: string;
        locationNorthingCoordinate: string;
        locationEastingCoordinate: string;
    };
}

async function fetchAndProcessBusstops(): Promise<processedBusstopObj> {
    const response = await fetch(
        `https://api.sl.se/api2/LineData.json?model=stop&key=${process.env.API_KEY}`
    );
    const busstops = await response.json();
    const busstopArray = (busstops as busstopsAPIObj).ResponseData.Result;
    function callbackFn(
        accumulator: processedBusstopObj,
        currentValue: busstopObj
    ) {
        return {
            ...accumulator,
            [currentValue.StopPointNumber]: {
                stopPointName: currentValue.StopPointName,
                locationNorthingCoordinate:
                    currentValue.LocationNorthingCoordinate,
                locationEastingCoordinate:
                    currentValue.LocationEastingCoordinate,
            },
        };
    }
    return busstopArray.reduce(callbackFn, {});
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<processedBusstopObj>
) {
    const processedBusstops = await fetchAndProcessBusstops();
    res.status(200).json(processedBusstops);
}
