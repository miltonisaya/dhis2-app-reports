import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React, { useState } from 'react'
import {
    SingleSelectField,
    SingleSelectOption,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularLoader,
    NoticeBox,
} from '@dhis2/ui'
import PeriodSelector from './components/PeriodSelector'
import OrgUnitSelector from './components/OrgUnitSelector'
import classes from './App.module.css'

const programsQuery = {
    results: {
        resource: 'programs',
        params: {
            pageSize: 100,
            fields: ['id', 'displayName'],
        },
    },
}

const orgUnitQuery = {
    results: {
        resource: 'organisationUnits',
        params: {
            fields: ['id', 'displayName', 'path'],
            filter: ['level:eq:1'],
            paging: false,
        },
    },
}

// Analytics events query — programId, periods and orgUnits are passed as
// runtime variables via refetch({ programId, periods, orgUnits })
const analyticsQuery = {
    events: {
        resource: 'analytics/events/query',
        id: ({ programId }) => programId,
        params: ({ periods, orgUnits }) => ({
            dimension: [
                `pe:${periods.join(';')}`,
                `ou:${orgUnits.join(';')}`,
            ],
            displayProperty: 'NAME',
            pageSize: 100,
        }),
    },
}

const MyApp = () => {
    const {
        loading: programLoading,
        error: programError,
        data: programData,
    } = useDataQuery(programsQuery)

    const {
        loading: orgUnitLoading,
        error: orgUnitError,
        data: orgUnitData,
    } = useDataQuery(orgUnitQuery)

    const {
        data: analyticsData,
        loading: analyticsLoading,
        error: analyticsError,
        refetch,
    } = useDataQuery(analyticsQuery, { lazy: true })

    // ── Selection state ──────────────────────────────────────────────────────
    const [selectedProgram, setSelectedProgram] = useState('')
    const [selectedPeriods, setSelectedPeriods] = useState([]) // [{ id, name }]
    const [orgUnitSelection, setOrgUnitSelection] = useState({
        selected: [],       // org unit paths from OrganisationUnitTree
        useUserOrgUnit: false,
        useSubUnits: false,
        useSubX2Units: false,
    })

    // ── Modal visibility ─────────────────────────────────────────────────────
    const [showPeriodModal, setShowPeriodModal] = useState(false)
    const [showOrgUnitModal, setShowOrgUnitModal] = useState(false)

    const [validationError, setValidationError] = useState('')

    // ── Generate report ──────────────────────────────────────────────────────
    const handleGenerateReport = () => {
        setValidationError('')

        if (!selectedProgram) {
            setValidationError(i18n.t('Please select a program.'))
            return
        }
        if (selectedPeriods.length === 0) {
            setValidationError(i18n.t('Please select at least one period.'))
            return
        }

        // Build the ou: dimension value — paths from tree → extract last UID segment
        const treeOrgUnits = orgUnitSelection.selected.map(
            path => path.split('/').filter(Boolean).pop()
        )
        const orgUnits = [
            ...(orgUnitSelection.useUserOrgUnit ? ['USER_ORGUNIT'] : []),
            ...(orgUnitSelection.useSubUnits ? ['USER_ORGUNIT_CHILDREN'] : []),
            ...(orgUnitSelection.useSubX2Units ? ['USER_ORGUNIT_GRANDCHILDREN'] : []),
            ...treeOrgUnits,
        ]

        if (orgUnits.length === 0) {
            setValidationError(i18n.t('Please select at least one organisation unit.'))
            return
        }

        refetch({
            programId: selectedProgram,
            periods: selectedPeriods.map(p => p.id),
            orgUnits,
        })
    }

    // ── Initial data loading ─────────────────────────────────────────────────
    if (programLoading || orgUnitLoading) {
        return (
            <div className={classes.centered}>
                <CircularLoader />
            </div>
        )
    }

    if (programError) {
        return (
            <NoticeBox error title={i18n.t('Error loading programs')}>
                {programError.message}
            </NoticeBox>
        )
    }

    if (orgUnitError) {
        return (
            <NoticeBox error title={i18n.t('Error loading organisation units')}>
                {orgUnitError.message}
            </NoticeBox>
        )
    }

    const programs = programData?.results?.programs ?? []
    const rootOrgUnitIds = (orgUnitData?.results?.organisationUnits ?? []).map(
        ou => ou.id
    )

    // ── Derived display labels ────────────────────────────────────────────────
    const periodButtonLabel =
        selectedPeriods.length === 0
            ? i18n.t('Select period')
            : selectedPeriods.length === 1
            ? selectedPeriods[0].name
            : i18n.t('{{count}} periods selected', { count: selectedPeriods.length })

    const orgUnitParts = [
        orgUnitSelection.useUserOrgUnit && i18n.t('User org unit'),
        orgUnitSelection.useSubUnits && i18n.t('Sub-units'),
        orgUnitSelection.useSubX2Units && i18n.t('Sub-x2-units'),
        orgUnitSelection.selected.length > 0 &&
            i18n.t('{{count}} unit(s)', { count: orgUnitSelection.selected.length }),
    ].filter(Boolean)

    const orgUnitButtonLabel =
        orgUnitParts.length === 0
            ? i18n.t('Select organisation unit')
            : orgUnitParts.join(', ')

    // ── Analytics response ────────────────────────────────────────────────────
    // Keep original index so row values align after hidden-column filtering
    const analyticsHeaders = (analyticsData?.events?.headers ?? [])
        .map((h, index) => ({ ...h, index }))
        .filter(h => !h.hidden)
    const analyticsRows = analyticsData?.events?.rows ?? []

    return (
        <div className={classes.layout}>
            {/* ── Left sidebar ── */}
            <div className={classes.sidebar}>
                <h1 className={classes.title}>{i18n.t('UCS Coordinator Reports')}</h1>

                {/* Program */}
                <div className={classes.filterItem}>
                    <SingleSelectField
                        label={i18n.t('Program')}
                        selected={selectedProgram}
                        onChange={({ selected }) => setSelectedProgram(selected)}
                        placeholder={i18n.t('Select a program')}
                    >
                        {programs.map(p => (
                            <SingleSelectOption
                                key={p.id}
                                label={p.displayName}
                                value={p.id}
                            />
                        ))}
                    </SingleSelectField>
                </div>

                {/* Period */}
                <div className={classes.filterItem}>
                    <span className={classes.filterLabel}>{i18n.t('Period')}</span>
                    <Button onClick={() => setShowPeriodModal(true)}>
                        {periodButtonLabel}
                    </Button>
                </div>

                {/* Organisation Unit */}
                <div className={classes.filterItem}>
                    <span className={classes.filterLabel}>
                        {i18n.t('Organisation Unit')}
                    </span>
                    <Button onClick={() => setShowOrgUnitModal(true)}>
                        {orgUnitButtonLabel}
                    </Button>
                </div>

                {/* Generate Report */}
                <Button
                    primary
                    onClick={handleGenerateReport}
                    disabled={analyticsLoading}
                >
                    {analyticsLoading
                        ? i18n.t('Loading...')
                        : i18n.t('Generate Report')}
                </Button>
            </div>

            {/* ── Right main panel ── */}
            <div className={classes.main}>
                {/* Validation error */}
                {validationError && (
                    <div className={classes.notice}>
                        <NoticeBox error title={i18n.t('Validation error')}>
                            {validationError}
                        </NoticeBox>
                    </div>
                )}

                {/* Analytics error */}
                {analyticsError && (
                    <div className={classes.notice}>
                        <NoticeBox error title={i18n.t('Error fetching report')}>
                            {analyticsError.message}
                        </NoticeBox>
                    </div>
                )}

                {/* Loading spinner */}
                {analyticsLoading && (
                    <div className={classes.centered}>
                        <CircularLoader />
                    </div>
                )}

                {/* Results table */}
                {analyticsData && !analyticsLoading && (
                    <div className={classes.report}>
                        <h2>{i18n.t('Report Results')}</h2>
                        {analyticsRows.length === 0 ? (
                            <NoticeBox title={i18n.t('No data')}>
                                {i18n.t('No data found for the selected criteria.')}
                            </NoticeBox>
                        ) : (
                            <div className={classes.tableWrapper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {analyticsHeaders.map(h => (
                                                <TableCell key={h.name}>
                                                    {h.column}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {analyticsRows.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {analyticsHeaders.map(h => (
                                                    <TableCell key={h.name}>
                                                        {row[h.index] ?? '—'}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Modals ── */}
            {showPeriodModal && (
                <PeriodSelector
                    selectedPeriods={selectedPeriods}
                    onUpdate={setSelectedPeriods}
                    onClose={() => setShowPeriodModal(false)}
                />
            )}

            {showOrgUnitModal && (
                <OrgUnitSelector
                    roots={rootOrgUnitIds}
                    initialSelection={orgUnitSelection}
                    onUpdate={setOrgUnitSelection}
                    onClose={() => setShowOrgUnitModal(false)}
                />
            )}
        </div>
    )
}

export default MyApp
