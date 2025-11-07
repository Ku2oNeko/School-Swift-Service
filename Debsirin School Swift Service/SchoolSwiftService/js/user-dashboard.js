function Dashboard({ issues, setIssues }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filteredIssues =
    filterStatus === "all"
      ? issues
      : issues.filter((i) => i.status === filterStatus);

  const updateStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, status } : issue))
    );
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const deleteIssue = (id) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
    setConfirmDeleteId(null);
  };

  return (
    <div className="max-w-4xl lg:max-w-6xl mx-auto my-6 p-5 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Dashboard รายงานปัญหา
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "รอดำเนินการ", "กำลังดำเนินการ", "เสร็จสิ้น"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-md text-sm ${filterStatus === status
                ? "bg-green-800 text-white"
                : "bg-gray-200 text-gray-600"
              }`}
          >
            {status === "all" ? "ทั้งหมด" : status}
          </button>
        ))}
      </div>
      {filteredIssues.length === 0 ? (
        <p className="text-base text-gray-500">ไม่มีรายงานปัญหาตามเงื่อนไข</p>
      ) : (
        <div className="issues-container flex flex-col gap-3 max-h-[80vh] overflow-y-auto p-2">
          {filteredIssues.map(
            ({
              id,
              title,
              roomNumber,
              description,
              fileName,
              fileDataUrl,
              createdAt,
              status,
            }) => (
              <div
                key={id}
                className="p-3 border border-gray-300 rounded-md bg-gray-50 flex flex-col sm:flex-row sm:items-start sm:gap-4"
              >
                <div className="flex-shrink-0 w-full sm:w-40">
                  {fileDataUrl ? (
                    <img
                      src={fileDataUrl}
                      alt={`แนบไฟล์: ${fileName}`}
                      className="rounded-md object-cover max-h-32 w-full sm:max-h-40"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32 w-full bg-gray-200 text-gray-500 rounded-md text-sm sm:h-40">
                      ไม่มีรูปภาพ
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title} (ห้อง {roomNumber})
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {description}
                  </p>
                  <p className="text-xs text-gray-500">
                    วันที่รายงาน: {createdAt}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <label className="font-medium text-gray-900 whitespace-nowrap">
                      สถานะ:
                    </label>
                    <label className="p-1 border border-gray-300 rounded-md bg-white text-gray-900 text-sm">
                      รอดำเนินการ
                    </label>
                    <button
                      onClick={() => confirmDelete(id)}
                      className="ml-auto bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      ลบ
                    </button>
                  </div>
                  {confirmDeleteId === id && (
                    <div className="mt-2 p-3 bg-red-100 rounded-md text-red-800 text-sm flex items-center gap-4">
                      <span>ยืนยันการลบรายการนี้?</span>
                      <button
                        onClick={() => deleteIssue(id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        ยืนยัน
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="bg-gray-300 text-gray-900 px-3 py-1 rounded-md text-sm"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
