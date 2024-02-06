import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define types for SleepRecord and SleepPayload
type SleepRecord = Record<{
    id: string;
    date: string;
    hoursSlept: number;
    quality: string; // Can be 'good', 'average', or 'poor'
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type SleepPayload = Record<{
    date: string;
    hoursSlept: number;
    quality: string;
}>

// Create a map to store sleep records
const sleepStorage = new StableBTreeMap<string, SleepRecord>(0, 44, 1024);

// Function to get all sleep records
$query;
export function getSleepRecords(): Result<Vec<SleepRecord>, string> {
    return Result.Ok(sleepStorage.values());
}

// Function to get a specific sleep record by ID
$query;
export function getSleepRecord(id: string): Result<SleepRecord, string> {
    return match(sleepStorage.get(id), {
        Some: (record) => Result.Ok<SleepRecord, string>(record),
        None: () => Result.Err<SleepRecord, string>(`Sleep record with id=${id} not found`)
    });
}

// Function to add a new sleep record
$update;
export function addSleepRecord(payload: SleepPayload): Result<SleepRecord, string> {
    const record: SleepRecord = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    sleepStorage.insert(record.id, record);
    return Result.Ok(record);
}

// Function to delete a sleep record
$update;
export function deleteSleepRecord(id: string): Result<SleepRecord, string> {
    return match(sleepStorage.remove(id), {
        Some: (deletedRecord) => Result.Ok<SleepRecord, string>(deletedRecord),
        None: () => Result.Err<SleepRecord, string>(`Sleep record with id=${id} not found`)
    });
}

// Function to update a sleep record
$update;
export function updateSleepRecord(id: string, payload: SleepPayload): Result<SleepRecord, string> {
    return match(sleepStorage.get(id), {
        Some: (record) => {
            const updatedRecord: SleepRecord = {...record, ...payload, updatedAt: Opt.Some(ic.time())};
            sleepStorage.insert(record.id, updatedRecord);
            return Result.Ok<SleepRecord, string>(updatedRecord);
        },
        None: () => Result.Err<SleepRecord, string>(`Sleep record with id=${id} not found`)
    });
}

// Function to calculate average sleep duration
$query;
export function getAverageSleepDuration(): Result<number, string> {
    const records = sleepStorage.values();
    if (records.length === 0) {
        return Result.Err<number, string>("No sleep records found.");
    }
    const totalHours = records.reduce((acc, record) => acc + record.hoursSlept, 0);
    const averageHours = totalHours / records.length;
    return Result.Ok<number, string>(averageHours);
}

// Function to calculate average sleep quality
$query;
export function getAverageSleepQuality(): Result<string, string> {
    const records = sleepStorage.values();
    if (records.length === 0) {
        return Result.Err<string, string>("No sleep records found.");
    }
    const qualityCounts: {[key: string]: number} = { 'good': 0, 'average': 0, 'poor': 0 };
    records.forEach(record => {
        qualityCounts[record.quality]++;
    });
    const maxQuality = Object.keys(qualityCounts).reduce((a, b) => qualityCounts[a] > qualityCounts[b] ? a : b);
    return Result.Ok<string, string>(maxQuality);
}

// Function to search sleep records by date
$query;
export function searchSleepRecordsByDate(date: string): Result<Vec<SleepRecord>, string> {
    const records = sleepStorage.values();
    const filteredRecords = records.filter(record => record.date === date);
    return Result.Ok(filteredRecords);
}

// Function to filter sleep records by quality
$query;
export function filterSleepRecordsByQuality(quality: string): Result<Vec<SleepRecord>, string> {
    const records = sleepStorage.values();
    const filteredRecords = records.filter(record => record.quality === quality);
    return Result.Ok(filteredRecords);
}

// Function to perform pagination on sleep records
$query;
export function paginateSleepRecords(page: number, pageSize: number): Result<Vec<SleepRecord>, string> {
    const records = sleepStorage.values();
    const startIndex = (page - 1) * pageSize;
    const paginatedRecords = records.slice(startIndex, startIndex + pageSize);
    return Result.Ok(paginatedRecords);
}

$query;
export function getSleepRecordsByDateRange(startDate: string, endDate: string): Result<Vec<SleepRecord>, string> {
    const records = sleepStorage.values();
    const filteredRecords = records.filter(record => record.date >= startDate && record.date <= endDate);
    return Result.Ok(filteredRecords);
}

$update;
export function updateSleepRecordQuality(id: string, quality: string): Result<SleepRecord, string> {
    return match(sleepStorage.get(id), {
        Some: (record) => {
            const updatedRecord: SleepRecord = {...record, quality, updatedAt: Opt.Some(ic.time())};
            sleepStorage.insert(record.id, updatedRecord);
            return Result.Ok<SleepRecord, string>(updatedRecord);
        },
        None: () => Result.Err<SleepRecord, string>(`Sleep record with id=${id} not found`)
    });
}

$query;
export function getTotalSleepHoursByDateRange(startDate: string, endDate: string): Result<number, string> {
    const records = sleepStorage.values();
    const filteredRecords = records.filter(record => record.date >= startDate && record.date <= endDate);
    const totalHours = filteredRecords.reduce((acc, record) => acc + record.hoursSlept, 0);
    return Result.Ok(totalHours);
}

$update;
export function deleteSleepRecordsOlderThan(date: string): Result<Vec<SleepRecord>, string> {
    const records = sleepStorage.values();
    const recordsToDelete = records.filter(record => record.date < date);
    recordsToDelete.forEach(record => sleepStorage.remove(record.id));
    return Result.Ok(recordsToDelete);
}

$update;
export function updateSleepRecordHoursSlept(id: string, hoursSlept: number): Result<SleepRecord, string> {
    return match(sleepStorage.get(id), {
        Some: (record) => {
            const updatedRecord: SleepRecord = {...record, hoursSlept, updatedAt: Opt.Some(ic.time())};
            sleepStorage.insert(record.id, updatedRecord);
            return Result.Ok<SleepRecord, string>(updatedRecord);
        },
        None: () => Result.Err<SleepRecord, string>(`Sleep record with id=${id} not found`)
    });
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};