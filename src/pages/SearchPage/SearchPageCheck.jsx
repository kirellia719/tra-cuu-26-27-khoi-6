import { useEffect, useState } from "react";
import { SearchX, Loader2, AlertTriangle } from "lucide-react";
import SearchPage from "./SearchPage";
import { settingService } from "../services/settingService";

export default function SearchPageCheck() {
  const [status, setStatus] = useState("loading");
  // loading | enabled | disabled | error

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingService.getSettings();
        setStatus(data.isSearchEnabled ? "enabled" : "disabled");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchSettings();
  }, []);

  // ================= LOADING =================
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-gray-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Đang kiểm tra trạng thái tra cứu...</p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md shadow-sm">
          <AlertTriangle className="mx-auto mb-3 w-10 h-10 text-red-500" />
          <h2 className="text-lg font-semibold text-red-600">
            Không thể kết nối server
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Vui lòng kiểm tra lại kết nối hoặc thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  // ================= DISABLED =================
  if (status === "disabled") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center max-w-md shadow-sm">
          <SearchX className="mx-auto mb-4 w-12 h-12 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Trang tra cứu đang tạm khoá
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Hệ thống đang bảo trì hoặc chưa mở tra cứu. Vui lòng quay lại sau.
          </p>
        </div>
      </div>
    );
  }

  // ================= ENABLED =================
  return <SearchPage />;
}