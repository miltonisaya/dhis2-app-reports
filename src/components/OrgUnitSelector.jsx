import React, { useState } from 'react'
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    Checkbox,
    OrganisationUnitTree,
} from '@dhis2/ui'

const OrgUnitSelector = ({ roots, initialSelection, onUpdate, onClose }) => {
    const [useUserOrgUnit, setUseUserOrgUnit] = useState(
        initialSelection.useUserOrgUnit || false
    )
    const [useSubUnits, setUseSubUnits] = useState(
        initialSelection.useSubUnits || false
    )
    const [useSubX2Units, setUseSubX2Units] = useState(
        initialSelection.useSubX2Units || false
    )
    const [selectedPaths, setSelectedPaths] = useState(
        initialSelection.selected || []
    )

    const handleUpdate = () => {
        onUpdate({ useUserOrgUnit, useSubUnits, useSubX2Units, selected: selectedPaths })
        onClose()
    }

    const handleDeselectAll = () => {
        setSelectedPaths([])
        setUseUserOrgUnit(false)
        setUseSubUnits(false)
        setUseSubX2Units(false)
    }

    const selectionSummaryParts = [
        useUserOrgUnit && 'User organisation unit',
        useSubUnits && 'User sub-units',
        useSubX2Units && 'User sub-x2-units',
        selectedPaths.length > 0 && `${selectedPaths.length} organisation unit(s)`,
    ].filter(Boolean)

    const selectionSummary =
        selectionSummaryParts.length > 0
            ? `Selected: ${selectionSummaryParts.join(', ')}`
            : 'None selected'

    return (
        <Modal large onClose={onClose}>
            <ModalTitle>Organisation unit</ModalTitle>
            <ModalContent>
                {/* User org unit options */}
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        flexWrap: 'wrap',
                        padding: '8px 0 12px',
                        borderBottom: '1px solid #e8edf2',
                        marginBottom: '12px',
                    }}
                >
                    <Checkbox
                        checked={useUserOrgUnit}
                        label="User organisation unit"
                        onChange={({ checked }) => setUseUserOrgUnit(checked)}
                    />
                    <Checkbox
                        checked={useSubUnits}
                        label="User sub-units"
                        onChange={({ checked }) => setUseSubUnits(checked)}
                    />
                    <Checkbox
                        checked={useSubX2Units}
                        label="User sub-x2-units"
                        onChange={({ checked }) => setUseSubX2Units(checked)}
                    />
                </div>

                {/* Organisation unit tree */}
                <div
                    style={{
                        border: '1px solid #d5dde5',
                        borderRadius: '4px',
                        padding: '8px',
                        maxHeight: '340px',
                        overflowY: 'auto',
                    }}
                >
                    {roots.length > 0 ? (
                        <OrganisationUnitTree
                            roots={roots}
                            selected={selectedPaths}
                            onChange={({ selected }) => setSelectedPaths(selected)}
                        />
                    ) : (
                        <span style={{ color: '#6c757d', fontSize: '14px' }}>
                            Loading organisation units...
                        </span>
                    )}
                </div>

                {/* Selection summary + Deselect all */}
                <div
                    style={{
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                    }}
                >
                    <span style={{ fontSize: '13px', color: '#495057', flex: 1 }}>
                        {selectionSummary}
                    </span>
                    <Button small onClick={handleDeselectAll}>
                        Deselect all
                    </Button>
                </div>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose}>Hide</Button>
                    <Button primary onClick={handleUpdate}>
                        Update
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default OrgUnitSelector
