import type { NextApiRequest, NextApiResponse } from "next";

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
interface processedBuslinesObj {
    [key: string]: {
        numberOfStops: number;
        stops: stopObj[];
    };
}

interface stopObj {
    stopId: string;
    direction: string;
}

interface processedTopTenBuslineObj {
    linenumber: string;
    numberOfStops: number;
    stops: stopObj[];
}

function reduceBusstopAndLineConnection(
    busAndStopConnectionArray: busAndStopConnectionObj[]
) {
    function callbackFn(
        accumulator: processedBuslinesObj,
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

async function fetchAndProcessBuslines(): Promise<processedTopTenBuslineObj> {
    const response = await fetch(
        `https://api.sl.se/api2/LineData.json?model=jour&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`
    );
    const journeyPatterns = await response.json();
    const busAndStopConnectionArray = (journeyPatterns as journeyPatternsAPIObj)
        .ResponseData.Result;
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
    return formattedTopTen as unknown as processedTopTenBuslineObj;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const processedBuslines = await fetchAndProcessBuslines();
    res.status(200).json(processedBuslines);
}
