import React from 'react'
import classes from '../ReportTables.module.css'

/**
 * Renders a multi-column matrix table: label | col1 | col2 | … | (TOTAL col).
 *
 * - `showColumnTotal` adds a TOTAL column summing across columns per row.
 * - `showTotal` adds a TOTAL footer row summing down each column.
 */
const MatrixTable = ({ section, valueMap }) => {
    const { title, subtitle, columns, rows, showColumnTotal, showTotal } = section

    const getValue = dxId => dxId == null ? 0 : parseFloat(valueMap?.[dxId]) || 0
    const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 })

    const rowTotals = rows.map(row =>
        columns.reduce((sum, col) => sum + getValue(row.dxIds[col.key]), 0)
    )

    const colTotals = columns.map(col =>
        rows.reduce((sum, row) => sum + getValue(row.dxIds[col.key]), 0)
    )

    const grandTotal = colTotals.reduce((sum, v) => sum + v, 0)

    return (
        <div className={classes.sectionBlock}>
            {title && <p className={classes.sectionTitle}>{title}</p>}
            {subtitle && <p className={classes.sectionSubtitle}>{subtitle}</p>}

            <table className={classes.reportTable}>
                <thead>
                    <tr>
                        <th></th>
                        {columns.map(col => (
                            <th key={col.key} className={classes.numCell}>{col.label}</th>
                        ))}
                        {showColumnTotal && (
                            <th className={classes.numCell}>TOTAL</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row.label}>
                            <td>{row.label}</td>
                            {columns.map(col => (
                                row.dxIds[col.key] == null
                                    ? <td key={col.key} className={classes.naCell}>N/A</td>
                                    : <td key={col.key} className={classes.numCell}>{fmt(getValue(row.dxIds[col.key]))}</td>
                            ))}
                            {showColumnTotal && (
                                <td className={classes.numCell}>{fmt(rowTotals[rowIndex])}</td>
                            )}
                        </tr>
                    ))}
                    {showTotal && (
                        <tr className={classes.totalRow}>
                            <td>TOTAL</td>
                            {colTotals.map((total, i) => (
                                <td key={columns[i].key} className={classes.numCell}>{fmt(total)}</td>
                            ))}
                            {showColumnTotal && (
                                <td className={classes.numCell}>{fmt(grandTotal)}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MatrixTable
