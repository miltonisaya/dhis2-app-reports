import React from 'react'
import classes from '../ReportTables.module.css'

/**
 * Renders a two-column table: label | value.
 * Optionally appends a TOTAL row that sums all row values.
 */
const SimpleTable = ({ section, valueMap }) => {
    const { title, subtitle, valueLabel, rows, showTotal } = section

    const getValue = dxId => parseFloat(valueMap?.[dxId]) || 0

    const total = showTotal ? rows.reduce((sum, row) => sum + getValue(row.dxId), 0) : null

    return (
        <div className={classes.sectionBlock}>
            {title && <p className={classes.sectionTitle}>{title}</p>}
            {subtitle && <p className={classes.sectionSubtitle}>{subtitle}</p>}

            <table className={classes.reportTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th className={classes.numCell}>{valueLabel ?? 'Value'}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.dxId}>
                            <td>{row.label}</td>
                            <td className={classes.numCell}>{getValue(row.dxId)}</td>
                        </tr>
                    ))}
                    {showTotal && (
                        <tr className={classes.totalRow}>
                            <td>TOTAL</td>
                            <td className={classes.numCell}>{total}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SimpleTable
