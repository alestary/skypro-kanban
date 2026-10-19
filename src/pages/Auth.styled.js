export const authStyles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "26px 20px",
        boxSizing: "border-box",
        background: "#FFFFFF",
        fontFamily: "Arial, Helvetica, sans-serif",
    },

    form: {
        width: "100%",
        maxWidth: "494px",
        minHeight: "440px",
        padding: "70px 79px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: "1px solid #d3dce9",
        borderRadius: "10px",
        boxShadow: "0 12px 35px rgba(44, 56, 78, 0.06)",
    },

    title: {
        margin: "0 0 31px",
        color: "#000000",
        fontSize: "26px",
        fontWeight: 700,
        lineHeight: 1.2,
        textAlign: "center",
    },

    input: {
        width: "100%",
        height: "41px",
        padding: "0 13px",
        marginBottom: "9px",
        boxSizing: "border-box",
        color: "#222222",
        background: "#ffffff",
        border: "1px solid #d3ddeb",
        borderRadius: "12px",
        outline: "none",
        fontSize: "16px",
    },

    inputError: {
        border: "1px solid #ff5b5b",
    },

    button: {
        width: "100%",
        minHeight: "41px",
        marginTop: "17px",
        padding: "10px",
        color: "#ffffff",
        background: "#5959f4",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: 600,
        cursor: "pointer",
    },

    buttonDisabled: {
        background: "#95a9c2",
        cursor: "not-allowed",
    },

    error: {
        margin: "9px 0 0",
        color: "#ff4545",
        fontSize: "14px",
        lineHeight: 1.55,
        textAlign: "center",
    },

    footer: {
        margin: "29px -20px 0",
        color: "#d0d9e7",
        fontSize: "16px",
        lineHeight: 1.7,
        textAlign: "center",
    },

    link: {
        color: "#cbd6e5",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        cursor: "pointer",
    },
    };

    export const responsiveAuthStyles = {
    page: {
        padding: "20px 14px",
    },

    form: {
        maxWidth: "100%",
        minHeight: "auto",
        padding: "48px 24px",
    },

    title: {
        fontSize: "24px",
        marginBottom: "27px",
    },

    footer: {
        marginTop: "25px",
        fontSize: "14px",
    },
};