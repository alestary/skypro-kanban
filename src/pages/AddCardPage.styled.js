export const addCardStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "rgba(35, 39, 45, 0.48)",
    fontFamily: "Arial, Helvetica, sans-serif",
    overflowY: "auto",
  },

  modal: {
    width: "100%",
    maxWidth: "570px",
    minHeight: "530px",
    padding: "40px 30px 48px 30px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
    border: "0.7px solid #D4DBE5",
    borderRadius: "10px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
  },

  title: {
    margin: "0 0 20px",
    color: "#000000",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "-0.14px",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
    columnGap: "19px",
    rowGap: "18px",
  },

  leftColumn: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  rightColumn: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  label: {
    display: "block",
    marginBottom: "14px",
    color: "#000000",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1,
  },

  input: {
    width: "100%",
    minWidth: 0,
    minHeight: "40px",
    padding: "12px 14px",
    marginBottom: "20px",
    boxSizing: "border-box",
    border: "0.7px solid rgba(148, 166, 190, 0.4)",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#333333",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontSize: "14px",
    lineHeight: 1.4,
  },

  textarea: {
    width: "100%",
    minWidth: 0,
    height: "200px",
    minHeight: "120px",
    padding: "14px",
    marginBottom: "18px",
    boxSizing: "border-box",
    resize: "vertical",
    border: "0.7px solid rgba(148, 166, 190, 0.4)",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#eaeef6",
    color: "#333333",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontSize: "14px",
    lineHeight: 1.5,
  },

  dateInput: {
    width: "100%",
    minWidth: 0,
    minHeight: "35px",
    padding: "5px",
    marginBottom: "12px",
    boxSizing: "border-box",
    border: "1px solid transparent",
    borderRadius: "4px",
    color: "#333333",
    backgroundColor: "#ffffff",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontSize: "12px",
  },

  dateHint: {
    margin: "0",
    color: "#333333",
    fontSize: "10px",
    lineHeight: 1.5,
  },

  categorySection: {
    marginTop: "0",
    gridColumn: "1 / -1"
  },

  categoryList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px"
  },

  categoryButton: {
    padding: "8px 20px 8px 20px",
    border: "none",
    borderRadius: "24px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontSize: "14px",
  },

  categoryColors: {
    "Web Design": {
      backgroundColor: "#FFE4C2",
      color: "#FF6D00",
    },
    Research: {
      backgroundColor: "#B4FDD1",
      color: "#06B16E",
    },
    Copywriting: {
      backgroundColor: "#E9D4FF",
      color: "#9A48F1",
    },
  },

  error: {
    margin: "12px 0 0",
    color: "#ff4545",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "17px",
  },
  
  submitButton: {
    padding: "0 14px",
    minHeight: "30px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#565eef",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },

  cancelButton: {
    padding: "0 14px",
    minHeight: "30px",
    border: "0.7px solid #565eef",
    borderRadius: "4px",
    backgroundColor: "transparent",
    color: "#565eef",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
};