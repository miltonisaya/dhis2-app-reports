# Report Configuration Guide

All report structure and DHIS2 ID mappings are defined in a single file:

```
src/reportConfig.js
```

You do not need to touch any component code to update IDs, labels, or report structure.

---

## Replacing Placeholder IDs

Every data element or program indicator in the config is currently a placeholder string like `DX_SCHOOL_PRIMARY`. Replace these with the real DHIS2 UID for that data element or indicator.

**Example — before:**
```js
{ label: 'Primary', dxId: 'DX_SCHOOL_PRIMARY' }
```

**Example — after:**
```js
{ label: 'Primary', dxId: 'AbCdEfGhIjK' }
```

For matrix rows, each column has its own ID:

**Example — before:**
```js
{ label: 'Primary', dxIds: { BOYS: 'DX_PUPILS_PRIMARY_BOYS', GIRLS: 'DX_PUPILS_PRIMARY_GIRLS' } }
```

**Example — after:**
```js
{ label: 'Primary', dxIds: { BOYS: 'AbCdEfGhIjK', GIRLS: 'LmNoPqRsTuV' } }
```

> UIDs can be found in DHIS2 under **Maintenance → Data Elements** or **Maintenance → Indicators**.
> They are 11-character alphanumeric strings (e.g. `fbfJHSPpUQD`).

---

## Report Structure

Each report in the `REPORTS` array has the following shape:

```js
{
  id: 'unique-report-id',        // used internally for navigation
  name: 'Report Display Name',   // shown in the sidebar and as the page heading
  programId: 'DHIS2_PROGRAM_UID',// the program this report belongs to
  letterhead: [                  // optional — renders a bordered box above the tables
    'LINE ONE',
    'LINE TWO',
    'LINE THREE',
  ],
  sections: [ /* see Section Types below */ ],
}
```

---

## Section Types

### `simple` — single value per row

Renders a two-column table: **label | value**.

```js
{
  id: 'section-id',
  type: 'simple',
  title: 'Section heading',          // optional bold heading above the table
  subtitle: 'Descriptive subheading',// optional lighter subheading
  valueLabel: 'Number',              // header text for the value column
  showTotal: true,                   // adds a TOTAL row that sums all values
  rows: [
    { label: 'Row label', dxId: 'DHIS2_UID' },
    // ...
  ],
}
```

### `matrix` — multiple columns per row

Renders a table: **label | col1 | col2 | … | (TOTAL col)**.

```js
{
  id: 'section-id',
  type: 'matrix',
  title: 'Section heading',
  showColumnTotal: true,   // adds a TOTAL column summing across columns per row
  showTotal: false,        // adds a TOTAL footer row summing down each column
  columns: [
    { label: 'Radio',      key: 'RADIO' },
    { label: 'Television', key: 'TV' },
    // ...
  ],
  rows: [
    {
      label: 'Row label',
      dxIds: { RADIO: 'DHIS2_UID_1', TV: 'DHIS2_UID_2' },
    },
    // ...
  ],
}
```

### `grouped-matrix` — matrix with a spanning header

Same as `matrix` but with an extra header row that spans all data columns.
Always shows a TOTAL column per row.

```js
{
  id: 'section-id',
  type: 'grouped-matrix',
  groupLabel: 'Left header cell text',     // top-left cell of the spanning header row
  groupHeader: 'Spanning header text',     // header that spans all data columns
  showTotal: true,                         // adds a TOTAL footer row
  columns: [
    { label: 'Male',   key: 'MALE' },
    { label: 'Female', key: 'FEMALE' },
  ],
  rows: [
    {
      label: 'Row label',
      dxIds: { MALE: 'DHIS2_UID_1', FEMALE: 'DHIS2_UID_2' },
    },
    // ...
  ],
}
```

---

## Letterhead

Add or remove a `letterhead` array on any report to show or hide the bordered heading box:

```js
letterhead: [
  'MINISTRY OF HEALTH',
  'DIRECTORATE OF PREVENTIVE SERVICES- HEALTH PROMOTION SECTION',
  'HEALTH EDUCATION AND PROMOTION IN SCHOOLS',
],
```

Remove the `letterhead` key entirely to hide the box for a report.

---

## Adding a New Report

1. Add a new object to the `REPORTS` array in `src/reportConfig.js`.
2. Give it a unique `id`, a `name`, and at least one section.
3. The new report will automatically appear in the sidebar — no component changes needed.

---

## Totals Logic

All totals are calculated client-side from the fetched values.

| Table type | Row total | Column/footer total |
|---|---|---|
| `simple` + `showTotal` | sum of all row `dxId` values | n/a |
| `matrix` + `showColumnTotal` | sum across columns per row | — |
| `matrix` + `showTotal` | — | sum down each column |
| `grouped-matrix` | always shown (sum across columns) | shown when `showTotal: true` |

Values default to `0` when the DHIS2 API returns no data for an ID.
