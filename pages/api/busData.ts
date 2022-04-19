// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import busstops from "../../resources/busstops.json";
import journeyPatterns from "../../resources/journeyPatterns.json";

// Data shapes from API
// 1. busstops
interface busstopsAPIObj {
    ResponseData: {
        Result: busstopObj[];
    };
}

interface busstopObj {
    StopPointNumber: string;
    StopPointName: string;
}

// 2. journeypatterns
interface journeyPatternsAPIObj {
    ResponseData: {
        Result: busAndStopConnectionObj[];
    };
}

interface busAndStopConnectionObj {
    LineNumber: string;
    JourneyPatternPointNumber: string;
}

// My data shapes
interface processedBusLineObj {
    lineNumber: string;
    numberOfStops: Number;
    stops: string[];
}

function createBusstopNameMappingObj(): any {
    const busstopArray = (busstops as busstopsAPIObj).ResponseData.Result;
    function callbackFn(previousValue: busstopObj, currentValue: busstopObj) {
        return {
            ...previousValue,
            [currentValue.StopPointNumber]: currentValue.StopPointName,
        };
    }
    return busstopArray.reduce(callbackFn, {} as busstopObj);
}

function reduceBusstopAndLineConnection(
    busAndStopConnectionArray: busAndStopConnectionObj[]
) {
    interface buslinesObj {
        [key: string]: {
            numberOfStops: number;
            stops: string[];
        };
    }

    function callbackFn(
        accumulator: buslinesObj,
        currentValue: busAndStopConnectionObj
    ) {
        if (!accumulator[currentValue.LineNumber]) {
            return {
                ...accumulator,
                [currentValue.LineNumber]: {
                    numberOfStops: 1,
                    stops: [currentValue.JourneyPatternPointNumber],
                },
            };
        }
        return {
            ...accumulator,
            [currentValue.LineNumber]: {
                numberOfStops:
                    accumulator[currentValue.LineNumber].numberOfStops + 1,
                stops: [
                    ...accumulator[currentValue.LineNumber].stops,
                    currentValue.JourneyPatternPointNumber,
                ],
            },
        };
    }

    return busAndStopConnectionArray.reduce(callbackFn, {});
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const busAndStopConnectionArray: busAndStopConnectionObj[] = (
        journeyPatterns as journeyPatternsAPIObj
    ).ResponseData.Result;
    const processedObj = reduceBusstopAndLineConnection(
        busAndStopConnectionArray
    );
    const processedArray = Object.entries(processedObj);
    const sortedArray = processedArray.sort(
        (a, b) => b[1].numberOfStops - a[1].numberOfStops
    );
    const topTen = sortedArray.slice(0, 10);
    const nameMappingObj = createBusstopNameMappingObj();
    const namedTopTen = topTen.map((element) => {
        return {
            ...element,
            stops: element[1].stops.map((stop) => {
                return { stopId: stop, stopName: nameMappingObj[stop] };
            }),
        };
    });
    res.status(200).json(namedTopTen);
}
