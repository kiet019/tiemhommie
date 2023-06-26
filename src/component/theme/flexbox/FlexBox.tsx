const FlexBox = ({ children }: any) => {
    return (
        <div
            style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    )
}

export default FlexBox