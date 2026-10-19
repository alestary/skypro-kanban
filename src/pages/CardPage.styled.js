
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
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: 1.4,
    overflowWrap: "anywhere",
  },

  category: {
    flexShrink: 0,
    padding: "7px 16px",
    borderRadius: "20px",
    backgroundColor: "#ffead7",
    color: "#fa8730",
    fontSize: "12px",
    fontWeight: 500,
  },

  section: {
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#111827",
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
  },

  description: {
    boxSizing: "border-box",
    minHeight: "165px",
    padding: "14px",
    border: "1px solid #dce4f0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },

  date: {
    margin: "0 0 12px",
    color: "#8da2c0",
    fontSize: "14px",
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
    padding: "10px 14px",
    border: "1px solid #635bff",
    borderRadius: "4px",
    backgroundColor: "#635bff",
    color: "#ffffff",
    fontSize: "12px",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "10px 14px",
    border: "1px solid #635bff",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    color: "#635bff",
    fontSize: "12px",
    cursor: "pointer",
  },

  dangerButton: {
    padding: "10px 14px",
    border: "1px solid #e9a0a0",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    color: "#d64545",
    fontSize: "12px",
    cursor: "pointer",
  },

  error: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    color: "#374151",
  },
};
