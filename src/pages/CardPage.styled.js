
export const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "rgba(20, 25, 35, 0.45)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  modal: {
    width: "100%",
    maxWidth: "760px",
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "32px 36px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e6ef",
    borderRadius: "12px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
    color: "#111827",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "24px",
    width: "100%",
  },

  title: {
    margin: "0",
    color: "#000000",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "24px",
    overflowWrap: "anywhere",
  },

  category: {
    display: "inline-block",
    flexShrink: 0,
    padding: "8px 20px",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 600,
  },

  section: {
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0 0 14px",
    color: "#000000",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1,
  },

  statusList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  status: {
    padding: "8px 15px",
    border: "1px solid #dce4f0",
    borderRadius: "22px",
    backgroundColor: "#ffffff",
    color: "#8da2c0",
    fontSize: "12px",
  },

  activeStatus: {
    color: "#ffffff",
    backgroundColor: "#94a9c6",
    borderColor: "#94a9c6",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(150px, 0.8fr)",
    gap: "24px",
    alignItems: "start",
    width: "100%",
    marginTop: "8px",
    boxSizing: "border-box",
  },

  description: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "200px",
    padding: "14px",
    border: "0.7px solid rgba(148, 166, 190, 0.4)",
    borderRadius: "8px",
    backgroundColor: "#eaeef6",
    color: "#333333",
    fontSize: "14px",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },

  date: {
    margin: "0 0 12px",
    color: "#94a6be",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  hint: {
    margin: "10px 0 0",
    color: "#8da2c0",
    fontSize: "11px",
    lineHeight: 1.5,
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "26px",
  },

  actionGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  primaryButton: {
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

  secondaryButton: {
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

  dangerButton: {
    padding: "0 14px",
    minHeight: "30px",
    border: "0.7px solid #d64545",
    borderRadius: "4px",
    backgroundColor: "transparent",
    color: "#d64545",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },

  error: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    color: "#374151",
  },
};
