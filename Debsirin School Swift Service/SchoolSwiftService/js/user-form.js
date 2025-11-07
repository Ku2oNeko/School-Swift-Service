const { useState, useCallback } = React;

function IssueForm({ setIssues, onSubmitSuccess }) {
  const [title, setTitle] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateRoomNumber = (value) => /^\d{3}$/.test(value);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      if (!title.trim() || !description.trim()) {
        setError("กรุณากรอกหัวข้อและรายละเอียดปัญหาให้ครบถ้วน");
        return;
      }
      if (!validateRoomNumber(roomNumber)) {
        setError("กรุณากรอกเลขห้องให้ถูกต้อง (3 ตัวเลข)");
        return;
      }

      setLoading(true);

      const newIssue = {
        id: Date.now(),
        title,
        roomNumber,
        description,
        fileName: file ? file.name : null,
        fileDataUrl: null,
        createdAt: new Date().toLocaleString(),
        status: "รอดำเนินการ",
      };

      const reader = new FileReader();
      reader.onload = (event) => {
        newIssue.fileDataUrl = event.target.result;
        setIssues((prev) => [newIssue, ...prev]);
        setLoading(false);
        clearForm();
        onSubmitSuccess();
      };
      reader.onerror = () => {
        setError("เกิดข้อผิดพลาดในการอ่านไฟล์ กรุณาลองใหม่อีกครั้ง");
        setLoading(false);
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        setIssues((prev) => [newIssue, ...prev]);
        setLoading(false);
        clearForm();
        onSubmitSuccess();
      }
    },
    [title, roomNumber, description, file, setIssues, onSubmitSuccess]
  );

  const clearForm = () => {
    setTitle("");
    setRoomNumber("");
    setDescription("");
    setFile(null);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto my-[155px] p-5 bg-white rounded-[10px] border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">แจ้งปัญหา</h2>
      {error && (
        <div className="bg-red-100 p-3 rounded-md text-red-700 text-sm mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-600"
          >
            หัวข้อปัญหา <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
            placeholder="กรอกหัวข้อปัญหา"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="roomNumber"
            className="block mb-1 font-medium text-gray-600"
          >
            เลขห้อง (3 ตัวเลข) <span className="text-red-600">*</span>
          </label>
          <input
            id="roomNumber"
            type="text"
            maxLength="3"
            value={roomNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,3}$/.test(val)) setRoomNumber(val);
            }}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
            placeholder="เช่น 101"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-600"
          >
            รายละเอียดปัญหา <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
            placeholder="อธิบายปัญหาที่พบ"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="file"
            className="block mb-1 font-medium text-gray-600"
          >
            แนบรูปภาพ (ถ้ามี)
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-600 text-sm"
            disabled={loading}
          />
          {file && (
            <p className="text-sm text-gray-500 mt-1">
              ไฟล์ที่เลือก: {file.name}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full bg-green-800 text-white p-3 rounded-md font-medium text-sm flex justify-center items-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              กำลังส่ง...
            </>
          ) : (
            "ส่งรายงาน"
          )}
        </button>
      </form>
    </div>
  );
}
