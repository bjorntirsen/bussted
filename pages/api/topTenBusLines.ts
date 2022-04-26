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
interface stopObj {
    stopId: string;
    direction: string;
    stopPointName?: string;
    locationNorthingCoordinate?: string;
    locationEastingCoordinate?: string;
}

interface processedBuslinesObj {
    [key: string]: {
        numberOfStops: number;
        stops: stopObj[];
    };
}

export interface processedTopTenBuslineObj {
    lineNumber: string;
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

const addDetailsToBusstops = (
    lineData: processedTopTenBuslineObj[],
    stopData: busstopObj[]
) => {
    const TopBuslinesWithDetailedStops = lineData.map((busline) => {
        const updatedStopArray = busline.stops.map((busstop) => {
            const correspondingDataObj = stopData.find(
                (busstopObj) => busstop.stopId === busstopObj.StopPointNumber
            );
            const {
                StopPointName,
                LocationNorthingCoordinate,
                LocationEastingCoordinate,
            } = correspondingDataObj as busstopObj;
            return {
                ...busstop,
                stopPointName: StopPointName,
                locationNorthingCoordinate: LocationNorthingCoordinate,
                locationEastingCoordinate: LocationEastingCoordinate,
            };
        });
        return { ...busline, stops: updatedStopArray };
    });
    return TopBuslinesWithDetailedStops;
};

async function fetchBuslinesAndStopsData(): Promise<
    [journeyPatternsAPIObj, busstopsAPIObj]
> {
    const [journeyPatternsJSON, busstopsJSON] = await Promise.all([
        fetch(
            `https://api.sl.se/api2/LineData.json?model=jour&DefaultTransportModeCode=BUS&key=${process.env.API_KEY}`
        ),
        fetch(
            `https://api.sl.se/api2/LineData.json?model=stop&key=${process.env.API_KEY}`
        ),
    ]);
    const [journeyPatterns, busstops] = await Promise.all([
        journeyPatternsJSON.json(),
        busstopsJSON.json(),
    ]);
    return [journeyPatterns, busstops];
}

function processBusData(
    journeyPatterns: journeyPatternsAPIObj,
    busstops: busstopsAPIObj
): processedTopTenBuslineObj[] {
    const busAndStopConnectionArray = (journeyPatterns as journeyPatternsAPIObj)
        .ResponseData.Result;
    const busstopArray = (busstops as busstopsAPIObj).ResponseData.Result;
    const processedObj = reduceBusstopAndLineConnection(
        busAndStopConnectionArray
    );
    const processedArray = Object.entries(processedObj);
    const sortedArray = processedArray.sort(
        (a, b) => b[1].numberOfStops - a[1].numberOfStops
    );
    const topTen = sortedArray.slice(0, 10);
    const formattedTopTen: processedTopTenBuslineObj[] = topTen.map(
        (busline) => {
            const formattedBusline = {
                lineNumber: busline[0],
                numberOfStops: busline[1].numberOfStops,
                stops: busline[1].stops,
            };
            return formattedBusline;
        }
    );
    const formattedTopTenWithDetails: processedTopTenBuslineObj[] =
        addDetailsToBusstops(formattedTopTen, busstopArray);
    return formattedTopTenWithDetails;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const [journeyPatterns, busstops] = await fetchBuslinesAndStopsData();
    const processedTopTenBuslines = processBusData(journeyPatterns, busstops);
    res.status(200).json(processedTopTenBuslines);
}
