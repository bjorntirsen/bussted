import type { NextApiRequest, NextApiResponse } from "next";
import busstops from "../../resources/busstops.json";

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

function createBusstopsObj(): processedBusstopObj {
    const busstopArray = (busstops as busstopsAPIObj).ResponseData.Result;
    function callbackFn(accumulator: processedBusstopObj, currentValue: busstopObj) {
        return {
            ...accumulator,
            [currentValue.StopPointNumber]: {
                stopPointName: currentValue.StopPointName,
                locationNorthingCoordinate: currentValue.LocationNorthingCoordinate,
                locationEastingCoordinate: currentValue.LocationEastingCoordinate,
            },
        };
    }
    return busstopArray.reduce(callbackFn, {});
}


export default function handler(req: NextApiRequest, res: NextApiResponse<processedBusstopObj>) {
    const processedBusstops = createBusstopsObj()
    res.status(200).json(processedBusstops);
}
