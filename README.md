# sleep-record-management-system

### Overview
This documentation provides an overview of the Sleep Record Management system, which is implemented in TypeScript using the Azle framework. The system allows users to manage sleep records, including adding new records, updating existing ones, deleting records, and querying sleep data.

### Data Structures
The Sleep Record Management system utilizes the following data structures:

1. **SleepRecord**: Represents a single sleep record with the following fields:
   - `id`: A unique identifier for the sleep record.
   - `date`: The date of the sleep record.
   - `hoursSlept`: The number of hours slept.
   - `quality`: The quality of sleep, which can be 'good', 'average', or 'poor'.
   - `createdAt`: The timestamp when the sleep record was created.
   - `updatedAt`: An optional field indicating the timestamp when the sleep record was last updated.

2. **SleepPayload**: A simplified version of SleepRecord used for adding new sleep records, containing the `date`, `hoursSlept`, and `quality` fields.

### Functions

1. **getSleepRecords**:
   - Description: Retrieves all sleep records stored in the system.
   - Return Type: `Result<Vec<SleepRecord>, string>`

2. **getSleepRecord**:
   - Description: Retrieves a specific sleep record by its ID.
   - Parameters:
     - `id`: The ID of the sleep record to retrieve.
   - Return Type: `Result<SleepRecord, string>`

3. **addSleepRecord**:
   - Description: Adds a new sleep record to the system.
   - Parameters:
     - `payload`: SleepPayload object containing the details of the sleep record.
   - Return Type: `Result<SleepRecord, string>`

4. **deleteSleepRecord**:
   - Description: Deletes a sleep record from the system by its ID.
   - Parameters:
     - `id`: The ID of the sleep record to delete.
   - Return Type: `Result<SleepRecord, string>`

5. **updateSleepRecord**:
   - Description: Updates an existing sleep record with new data.
   - Parameters:
     - `id`: The ID of the sleep record to update.
     - `payload`: SleepPayload object containing the updated details.
   - Return Type: `Result<SleepRecord, string>`

6. **getAverageSleepDuration**:
   - Description: Calculates the average duration of sleep across all records.
   - Return Type: `Result<number, string>`

7. **getAverageSleepQuality**:
   - Description: Calculates the most common sleep quality among all records.
   - Return Type: `Result<string, string>`

8. **searchSleepRecordsByDate**:
   - Description: Retrieves sleep records that match a specified date.
   - Parameters:
     - `date`: The date to search for.
   - Return Type: `Result<Vec<SleepRecord>, string>`

9. **filterSleepRecordsByQuality**:
   - Description: Retrieves sleep records that match a specified quality.
   - Parameters:
     - `quality`: The quality to filter by ('good', 'average', or 'poor').
   - Return Type: `Result<Vec<SleepRecord>, string>`

10. **paginateSleepRecords**:
    - Description: Retrieves a subset of sleep records for pagination purposes.
    - Parameters:
      - `page`: The page number to retrieve.
      - `pageSize`: The number of records per page.
    - Return Type: `Result<Vec<SleepRecord>, string>`

11. **getSleepRecordsByDateRange**:
    - Description: Retrieves sleep records within a specified date range.
    - Parameters:
      - `startDate`: The start date of the range.
      - `endDate`: The end date of the range.
    - Return Type: `Result<Vec<SleepRecord>, string>`

12. **updateSleepRecordQuality**:
    - Description: Updates the quality of a sleep record by its ID.
    - Parameters:
      - `id`: The ID of the sleep record to update.
      - `quality`: The new quality value ('good', 'average', or 'poor').
    - Return Type: `Result<SleepRecord, string>`

13. **getTotalSleepHoursByDateRange**:
    - Description: Calculates the total number of sleep hours within a specified date range.
    - Parameters:
      - `startDate`: The start date of the range.
      - `endDate`: The end date of the range.
    - Return Type: `Result<number, string>`

14. **deleteSleepRecordsOlderThan**:
    - Description: Deletes all sleep records older than a specified date.
    - Parameters:
      - `date`: The date used for filtering records to delete.
    - Return Type: `Result<Vec<SleepRecord>, string>`

15. **updateSleepRecordHoursSlept**:
    - Description: Updates the number of hours slept for a sleep record by its ID.
    - Parameters:
      - `id`: The ID of the sleep record to update.
      - `hoursSlept`: The new number of hours slept.
    - Return Type: `Result<SleepRecord, string>`

### Additional Notes
- The system utilizes Azle's `$query` and `$update` decorators for defining query and update functions.
- A workaround is implemented to make the `uuid` package compatible with Azle.
- Error handling is implemented using `Result` types to handle success and error scenarios gracefully.

#### Installation

1. Clone the repository

   ```bash
    git clone https://github.com/lale001/sleep-record-management-system.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the IC local development environment

    ```bash
    dfx start --background --clean
    ```

4. Deploy the canisters to the local development environment

    ```bash
    dfx deploy
    ```
