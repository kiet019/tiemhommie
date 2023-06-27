const FlexBox = ({ children, justifyContent }: any) => {
    return (
        <div
            style={{
                justifyContent: justifyContent !== undefined ? justifyContent : "space-between",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    )
}

export default FlexBox