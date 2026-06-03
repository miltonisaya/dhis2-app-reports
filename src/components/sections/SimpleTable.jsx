import React from 'react'
import classes from '../ReportTables.module.css'

/**
 * Renders a two-column table: label | value.
 * Optionally appends a TOTAL row that sums all row values.
 */
const SimpleTable = ({ section, valueMap }) => {
    const { title, subtitle, valueLabel, rows, showTotal } = section

    const getValue = dxId => parseFloat(valueMap?.[dxId]) || 0
    const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 })

    const total = showTotal ? rows.reduce((sum, row) => sum + getValue(row.dxId), 0) : null

    return (
        <div className={classes.sectionBlock}>
            {title && <p className={classes.sectionTitle}>{title}</p>}

            <table className={classes.reportTable}>
                <thead>
                    <tr>
                        <th>{subtitle ?? ''}</th>
                        <th className={classes.numCell}>{valueLabel ?? 'Value'}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.dxId}>
                            <td>{row.label}</td>
                            <td className={classes.numCell}>{fmt(getValue(row.dxId))}</td>
                        </tr>
                    ))}
                    {showTotal && (
                        <tr className={classes.totalRow}>
                            <td>TOTAL</td>
                            <td className={classes.numCell}>{fmt(total)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SimpleTable
