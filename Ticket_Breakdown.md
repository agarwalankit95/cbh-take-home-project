# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Requirement: Allow Facilities to store custom Agent ID and generate agent report using that custom Agent ID

### Ticket 1: Ability for Facility to save custom Agent ID

- **Details**:
  - Facilities require a feature to save their own custom Agent IDs to easily access Agent's report.

- **Acceptance Criteria**:
  - Facility should be able to save their own custom agent ID for any Agent they work with.

- **Implementation Details**:
  - Add a column `custom_agent_id` as unique and not null in `Agents` table, assuming there is already a relationship between Facilities, Agents, and Shifts tables, as Facilities were generating reports using `id` column value from the Agents table (Now they can use `custom_agent_id` column value).
  - Create an API to update `custom agent id` inputted by the Facility, in the above added column.

- **Effort Estimation**: 6 hours
  - Implementing database changes: 2 hours
  - Implementing API: 3 hours
  - Testing the complete implementation: 1 hour


### Ticket 2: Modify getShiftsByFacility function to get custom_agent_id column data

- **Details**:
  - `getShiftsByFacility` function is already there which is returning list of shifts along with each assigned agents' metadata for inputted Facility id.
  - We need to modify `getShiftsByFacility` function to also get value from `custom_agent_id` column in agents' metadata

- **Acceptance Criteria**:
  - `getShiftsByFacility` function should return list of shifts for particular Facility id along with `custom_agent_id` value in agents' metadata

- **Implementation Details**:
  - `getShiftsByFacility` function must already be querying Agents table to get other metadata for Agents, we just need to add `custom_agent_id` column as well in query and return the value in metadata (assuming metadata as object with key-value pair for each agent).

- **Effort Estimation**: 3 hours
  - Implentation: 2 hours
  - Testing: 1 hour


### Ticket 3: Modify generateReport function to generate report based on inputted Custom Agent ID

- **Details**:
  - modify `generateReport(list_of_shifts)` function as `generateReport(list_of_shifts, custom_agent_id)` assuming earlier it was taking only `list_of_shifts` as input and now it will take `custom_agent_id` (optional field) as well inputted by the facility for which they want to generate report.

- **Acceptance Criteria**:
  - Facility should be able to input custom agent ID for any Agent for which they want to generate report.

- **Implementation Details**:
  - call `generateReport` function to give report in pdf format for the agent whose `custom_agent_id` is entered by Facility otherwise it will return the pdf as earlier.
  - For the entered `custom_agent_id` by the facility, filter list of shifts and generate pdf report for that Agent.

- **Effort Estimation**: 5 hours
  - Implentation: 3 hours
  - Testing: 2 hours
 
### Ticket 3 is blocked on Ticket 2 and Ticket 2 is blocked on Ticket 1.
