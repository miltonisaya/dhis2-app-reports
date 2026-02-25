import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React, { useState, useMemo } from 'react'
import {
    Button,
    CircularLoader,
    NoticeBox,
} from '@dhis2/ui'
import PeriodSelector from './components/PeriodSelector'
import OrgUnitSelector from './components/OrgUnitSelector'
import ReportNav from './components/ReportNav'
import ReportRenderer from './components/ReportRenderer'
import { REPORTS, collectDxIds } from './reportConfig'
import classes from './App.module.css'

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

// Aggregate analytics query — dxIds, periods, orgUnits are runtime variables
const analyticsQuery = {
    data: {
        resource: 'analytics',
        params: ({ dxIds, periods, orgUnits }) => ({
            dimension: [
                `dx:${dxIds.join(';')}`,
                `pe:${periods.join(';')}`,
                `ou:${orgUnits.join(';')}`,
            ],
        }),
    },
}

const MyApp = () => {
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

    // ── Report navigation ─────────────────────────────────────────────────────
    const [activeReportId, setActiveReportId] = useState(REPORTS[0].id)
    const activeReport = REPORTS.find(r => r.id === activeReportId)

    const handleSelectReport = id => {
        setActiveReportId(id)
        setValidationError('')
    }

    // Collect all DX IDs referenced by the active report
    const dxIds = useMemo(() => collectDxIds(activeReport), [activeReportId])

    // ── Selection state ───────────────────────────────────────────────────────
    const [selectedPeriods, setSelectedPeriods] = useState([])
    const [orgUnitSelection, setOrgUnitSelection] = useState({
        selected: [],
        useUserOrgUnit: false,
        useSubUnits: false,
        useSubX2Units: false,
    })

    // ── Modal visibility ──────────────────────────────────────────────────────
    const [showPeriodModal, setShowPeriodModal] = useState(false)
    const [showOrgUnitModal, setShowOrgUnitModal] = useState(false)

    const [validationError, setValidationError] = useState('')

    // ── Generate report ───────────────────────────────────────────────────────
    const handleGenerateReport = () => {
        setValidationError('')

        if (selectedPeriods.length === 0) {
            setValidationError(i18n.t('Please select at least one period.'))
            return
        }

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
            dxIds,
            periods: selectedPeriods.map(p => p.id),
            orgUnits,
        })
    }

    // ── Value map: sum across pe/ou if multiple selected ──────────────────────
    const valueMap = useMemo(() => {
        const map = {}
        for (const [dxId, , , value] of analyticsData?.data?.rows ?? []) {
            map[dxId] = (map[dxId] ?? 0) + (parseFloat(value) || 0)
        }
        return map
    }, [analyticsData])

    // ── Initial data loading ──────────────────────────────────────────────────
    if (orgUnitLoading) {
        return (
            <div className={classes.centered}>
                <CircularLoader />
            </div>
        )
    }

    if (orgUnitError) {
        return (
            <NoticeBox error title={i18n.t('Error loading organisation units')}>
                {orgUnitError.message}
            </NoticeBox>
        )
    }

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

    return (
        <div className={classes.layout}>
            {/* ── Left sidebar ── */}
            <div className={classes.sidebar}>
                <h1 className={classes.title}>{i18n.t('UCS Coordinator Reports')}</h1>

                {/* Report navigation */}
                <ReportNav
                    reports={REPORTS}
                    activeId={activeReportId}
                    onSelect={handleSelectReport}
                />

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
                {/* Report title (always visible) */}
                <h2 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 16px', color: '#1a3c52' }}>
                    {activeReport.name}
                </h2>

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

                {/* Structured report */}
                {!analyticsLoading && (
                    <ReportRenderer
                        report={activeReport}
                        valueMap={valueMap}
                    />
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
