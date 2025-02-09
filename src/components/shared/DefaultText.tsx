import React from 'react'

const DefaultText = ({ label }: { label: string }) => {
    return (
        <div className="text-center text-muted-foreground py-4">
            No {label} found
        </div>
    )
}

export default DefaultText