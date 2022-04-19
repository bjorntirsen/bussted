import type { NextApiRequest, NextApiResponse } from "next";
import journeyPatterns from "../../resources/journeyPatterns.json";

// Data shapes from API
interface journeyPatternsAPIObj {
    ResponseData: {
        Result: busAndStopConnectionObj[];
    };
}

interface busAndStopConnectionObj {
    LineNumber: string;
    JourneyPatternPointNumber: string;
    DirectionCode: string;
}

// My data shapes
interface buslinesObj {
    [key: string]: {
        numberOfStops: number;
        stops: stopObj[];
    };
}

interface stopObj {
    stopId: string;
    direction: string;
}

function reduceBusstopAndLineConnection(
    busAndStopConnectionArray: busAndStopConnectionObj[]
) {
    function callbackFn(
        accumulator: buslinesObj,
        currentValue: busAndStopConnectionObj
    ) {
        if (!accumulator[currentValue.LineNumber]) {
            return {
                ...accumulator,
                [currentValue.LineNumber]: {
                    numberOfStops: 1,
                    stops: [
                        {
                            stopId: currentValue.JourneyPatternPointNumber,
                            direction: currentValue.DirectionCode,
                        },
                    ],
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
                    {
                        stopId: currentValue.JourneyPatternPointNumber,
                        direction: currentValue.DirectionCode,
                    },
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
    const formattedTopTen = topTen.map((busline) => {
        const formattedBusline = {
            lineNumber: busline[0],
            numberOfStops: busline[1].numberOfStops,
            stops: busline[1].stops,
        };
        return formattedBusline;
    });
    res.status(200).json(formattedTopTen);
}
