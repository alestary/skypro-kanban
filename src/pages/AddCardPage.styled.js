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
    margin: 0,
    color: "#000000",
    fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "-0.14px",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(170px, 1fr)",
    gap: "14px",
    alignItems: "start",
    width: "100%",
    boxSizing: "border-box",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: 0,
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: 0,
  },

  fieldset: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: "none",
  },

  categories: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "6px",
    marginTop: "4px",
  },

  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: "8px",
    width: "100%",
    marginTop: "auto",
    paddingTop: "14px",
    boxSizing: "border-box",
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

  statusButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "28px",
    padding: "0 12px",
    border: "1px solid #e3e8f0",
    borderRadius: "18px",
    backgroundColor: "#fff",
    color: "#94a3b8",
    fontSize: "10px",
    lineHeight: "14px",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },

  activeStatusButton: {
  backgroundColor: "#94a9c4",
  color: "#fff",
  borderColor: "#94a9c4",
},

  categoryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "28px",
    padding: "0 14px",
    border: "none",
    borderRadius: "18px",
    fontSize: "10px",
    lineHeight: "14px",
    whiteSpace: "nowrap",
    cursor: "pointer",
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    marginBottom: "20px",
  },
};