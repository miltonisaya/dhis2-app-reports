import React, { useState } from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    Tab,
    TabBar,
    SingleSelectField,
    SingleSelectOption,
    InputField,
} from '@dhis2/ui'

const RELATIVE_PERIOD_TYPES = [
    { id: 'days', label: 'Days' },
    { id: 'weeks', label: 'Weeks' },
    { id: 'months', label: 'Months' },
    { id: 'bimonths', label: 'Bi-months' },
    { id: 'quarters', label: 'Quarters' },
    { id: 'sixmonths', label: 'Six-months' },
    { id: 'financialyears', label: 'Financial years' },
    { id: 'years', label: 'Years' },
]

const RELATIVE_PERIODS = {
    days: [
        { id: 'TODAY', name: 'Today' },
        { id: 'YESTERDAY', name: 'Yesterday' },
        { id: 'LAST_3_DAYS', name: 'Last 3 days' },
        { id: 'LAST_7_DAYS', name: 'Last 7 days' },
        { id: 'LAST_14_DAYS', name: 'Last 14 days' },
    ],
    weeks: [
        { id: 'THIS_WEEK', name: 'This week' },
        { id: 'LAST_WEEK', name: 'Last week' },
        { id: 'LAST_4_WEEKS', name: 'Last 4 weeks' },
        { id: 'LAST_12_WEEKS', name: 'Last 12 weeks' },
        { id: 'LAST_52_WEEKS', name: 'Last 52 weeks' },
        { id: 'WEEKS_THIS_YEAR', name: 'Weeks this year' },
    ],
    months: [
        { id: 'THIS_MONTH', name: 'This month' },
        { id: 'LAST_MONTH', name: 'Last month' },
        { id: 'LAST_3_MONTHS', name: 'Last 3 months' },
        { id: 'LAST_6_MONTHS', name: 'Last 6 months' },
        { id: 'MONTHS_THIS_YEAR', name: 'Months this year' },
        { id: 'LAST_12_MONTHS', name: 'Last 12 months' },
    ],
    bimonths: [
        { id: 'THIS_BIMONTH', name: 'This bi-month' },
        { id: 'LAST_BIMONTH', name: 'Last bi-month' },
        { id: 'LAST_6_BIMONTHS', name: 'Last 6 bi-months' },
        { id: 'BIMONTHS_THIS_YEAR', name: 'Bi-months this year' },
    ],
    quarters: [
        { id: 'THIS_QUARTER', name: 'This quarter' },
        { id: 'LAST_QUARTER', name: 'Last quarter' },
        { id: 'LAST_4_QUARTERS', name: 'Last 4 quarters' },
        { id: 'QUARTERS_THIS_YEAR', name: 'Quarters this year' },
    ],
    sixmonths: [
        { id: 'THIS_SIX_MONTH', name: 'This six-month' },
        { id: 'LAST_SIX_MONTH', name: 'Last six-month' },
        { id: 'LAST_2_SIXMONTHS', name: 'Last 2 six-months' },
    ],
    financialyears: [
        { id: 'THIS_FINANCIAL_YEAR', name: 'This financial year' },
        { id: 'LAST_FINANCIAL_YEAR', name: 'Last financial year' },
        { id: 'LAST_5_FINANCIAL_YEARS', name: 'Last 5 financial years' },
    ],
    years: [
        { id: 'THIS_YEAR', name: 'This year' },
        { id: 'LAST_YEAR', name: 'Last year' },
        { id: 'LAST_5_YEARS', name: 'Last 5 years' },
    ],
}

const FIXED_PERIOD_TYPES = [
    { id: 'DAILY', label: 'Daily' },
    { id: 'WEEKLY', label: 'Weekly' },
    { id: 'MONTHLY', label: 'Monthly' },
    { id: 'QUARTERLY', label: 'Quarterly' },
    { id: 'YEARLY', label: 'Yearly' },
]

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

const generateFixedPeriods = (type, year) => {
    const y = parseInt(year, 10)
    if (isNaN(y)) return []
    switch (type) {
        case 'DAILY': {
            const days = []
            const d = new Date(y, 0, 1)
            while (d.getFullYear() === y) {
                const m = String(d.getMonth() + 1).padStart(2, '0')
                const day = String(d.getDate()).padStart(2, '0')
                days.push({
                    id: `${y}${m}${day}`,
                    name: `${y} ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`,
                })
                d.setDate(d.getDate() + 1)
            }
            return days
        }
        case 'WEEKLY':
            return Array.from({ length: 52 }, (_, i) => ({
                id: `${y}W${i + 1}`,
                name: `${y} W${i + 1}`,
            }))
        case 'MONTHLY':
            return MONTHS.map((m, i) => ({
                id: `${y}${String(i + 1).padStart(2, '0')}`,
                name: `${y} ${m}`,
            }))
        case 'QUARTERLY':
            return [1, 2, 3, 4].map(q => ({ id: `${y}Q${q}`, name: `${y} Q${q}` }))
        case 'YEARLY':
            return [{ id: String(y), name: String(y) }]
        default:
            return []
    }
}

const listItemStyle = (highlighted) => ({
    padding: '6px 12px',
    cursor: 'pointer',
    background: highlighted ? '#daeaf6' : 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    userSelect: 'none',
    fontSize: '14px',
})

const circleStyle = (filled) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: `1.5px solid ${filled ? '#276696' : '#6c757d'}`,
    background: filled ? '#c5e5f0' : 'transparent',
    display: 'inline-block',
    flexShrink: 0,
})

const navBtnStyle = {
    width: '36px',
    height: '36px',
    fontSize: '18px',
    lineHeight: 1,
    border: '1px solid #a0aab4',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const PeriodSelector = ({ selectedPeriods, onUpdate, onClose }) => {
    const [activeTab, setActiveTab] = useState('relative')
    const [relativeType, setRelativeType] = useState('months')
    const [fixedType, setFixedType] = useState('MONTHLY')
    const [fixedYear, setFixedYear] = useState(String(new Date().getFullYear()))
    const [localSelected, setLocalSelected] = useState([...selectedPeriods])
    const [leftHighlighted, setLeftHighlighted] = useState([])
    const [rightHighlighted, setRightHighlighted] = useState([])

    const availablePeriods =
        activeTab === 'relative'
            ? RELATIVE_PERIODS[relativeType] || []
            : generateFixedPeriods(fixedType, fixedYear)

    const toggleLeft = (id) =>
        setLeftHighlighted(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )

    const toggleRight = (id) =>
        setRightHighlighted(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )

    const addAll = () => {
        const toAdd = availablePeriods.filter(p => !localSelected.find(s => s.id === p.id))
        setLocalSelected(prev => [...prev, ...toAdd])
        setLeftHighlighted([])
    }

    const addSelected = () => {
        const toAdd = availablePeriods.filter(
            p => leftHighlighted.includes(p.id) && !localSelected.find(s => s.id === p.id)
        )
        setLocalSelected(prev => [...prev, ...toAdd])
        setLeftHighlighted([])
    }

    const removeAll = () => {
        setLocalSelected([])
        setRightHighlighted([])
    }

    const removeSelected = () => {
        setLocalSelected(prev => prev.filter(p => !rightHighlighted.includes(p.id)))
        setRightHighlighted([])
    }

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Period</ModalTitle>
            <ModalContent>
                <div style={{ display: 'flex', gap: '16px', minHeight: '420px' }}>

                    {/* ── Left panel ── */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <TabBar>
                            <Tab
                                selected={activeTab === 'relative'}
                                onClick={() => setActiveTab('relative')}
                            >
                                Relative periods
                            </Tab>
                            <Tab
                                selected={activeTab === 'fixed'}
                                onClick={() => setActiveTab('fixed')}
                            >
                                Fixed periods
                            </Tab>
                        </TabBar>

                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <SingleSelectField
                                    label="Period type"
                                    selected={activeTab === 'relative' ? relativeType : fixedType}
                                    onChange={({ selected }) =>
                                        activeTab === 'relative'
                                            ? setRelativeType(selected)
                                            : setFixedType(selected)
                                    }
                                    dense
                                >
                                    {(activeTab === 'relative'
                                        ? RELATIVE_PERIOD_TYPES
                                        : FIXED_PERIOD_TYPES
                                    ).map(t => (
                                        <SingleSelectOption key={t.id} value={t.id} label={t.label} />
                                    ))}
                                </SingleSelectField>
                            </div>
                            {activeTab === 'fixed' && (
                                <div style={{ width: '90px', flexShrink: 0 }}>
                                    <InputField
                                        label="Year"
                                        value={fixedYear}
                                        onChange={({ value }) => setFixedYear(value)}
                                        type="number"
                                        min="2000"
                                        max="2100"
                                        dense
                                    />
                                </div>
                            )}
                        </div>

                        <div
                            style={{
                                marginTop: '8px',
                                flex: 1,
                                border: '1px solid #d5dde5',
                                borderRadius: '4px',
                                overflowY: 'auto',
                                maxHeight: '300px',
                            }}
                        >
                            {availablePeriods.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => toggleLeft(p.id)}
                                    style={listItemStyle(leftHighlighted.includes(p.id))}
                                >
                                    <span style={circleStyle(false)} />
                                    {p.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Navigation arrows ── */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '6px',
                            paddingTop: '56px',
                            flexShrink: 0,
                        }}
                    >
                        {[
                            { label: '»', fn: addAll, title: 'Add all' },
                            { label: '›', fn: addSelected, title: 'Add selected' },
                            { label: '«', fn: removeAll, title: 'Remove all' },
                            { label: '‹', fn: removeSelected, title: 'Remove selected' },
                        ].map(({ label, fn, title }) => (
                            <button key={title} onClick={fn} title={title} style={navBtnStyle}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ── Right panel – Selected Periods ── */}
                    <div
                        style={{
                            flex: 1,
                            border: '1px solid #d5dde5',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                        }}
                    >
                        <div
                            style={{
                                padding: '10px 12px',
                                fontWeight: 500,
                                fontSize: '14px',
                                borderBottom: '1px solid #d5dde5',
                                color: '#212529',
                            }}
                        >
                            Selected Periods
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {localSelected.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => toggleRight(p.id)}
                                    style={listItemStyle(rightHighlighted.includes(p.id))}
                                >
                                    <span style={circleStyle(true)} />
                                    {p.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose}>Hide</Button>
                    <Button
                        primary
                        onClick={() => {
                            onUpdate(localSelected)
                            onClose()
                        }}
                    >
                        Update
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default PeriodSelector
