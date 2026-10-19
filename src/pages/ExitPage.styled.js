export const exitStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(35, 39, 45, 0.48)",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  modal: {
    width: "370px",
    minHeight: "180px",
    padding: "50px 60px 50px 60px",
    boxSizing: "border-box",

    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",

    textAlign: "center",
  },

  title: {
    margin: "0 0 12px",
    color: "#000000",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "150%",
    whiteSpace: "nowrap",
    fontFamily: "Roboto"
  },

  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    width: "100%",
  },

  confirmButton: {
    flex: 1,
    padding: "5px 3px",
    backgroundColor: "#565EEF",
    color: "#FFFFFF",
    border: "1px solid #565EEF",
    borderRadius:"4px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontWeight: 500,
    lineHeight: "150%",
    fontFamily: "Roboto"

  },

  cancelButton: {
    flex: 1,
    padding: "5px 3px",
    backgroundColor: "#FFFFFF",
    color: "#565EEF",
    border: "1px solid #565EEF",
    borderRadius: "4px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontWeight: 500,
    lineHeight: "150%",
    fontFamily: "Roboto"

  },
};