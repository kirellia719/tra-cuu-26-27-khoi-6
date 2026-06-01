import { useEffect, useState } from "react";
import {
  Switch,
  Button,
  message,
  Spin,
} from "antd";
import { Search } from "lucide-react";
import { settingService } from "../services/settingService";
import { SaveOutlined } from "@ant-design/icons";

const AdminSetting = () => {
  const [settings, setSettings] = useState({
    isSearchEnabled: false,
    cutoffScoreGrade6: null,
    cutoffScoreGrade10: null,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingService.getSettings();

        setSettings({
          isSearchEnabled: data.isSearchEnabled,
          cutoffScoreGrade6: data.cutoffScoreGrade6,
          cutoffScoreGrade10: data.cutoffScoreGrade10,
        });
      } catch (err) {
        message.error("Không thể tải cấu hình");
        console.log(err);

      } finally {
        setInitialLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await settingService.updateSettings(settings);
      message.success("Đã lưu cấu hình!");
    } catch {
      message.error("Lưu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 max-w-3xl mx-auto flex flex-col gap-6 text-blue-900">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">

        {/* TITLE */}
        <h2 className="text-sm font-bold mb-4 tracking-wide">
          1. CÀI ĐẶT TRA CỨU
        </h2>

        <div className="border border-slate-200 rounded-xl overflow-hidden">

          {/* ITEM 1 */}
          <div className="flex items-center justify-between p-4 md:p-5">
            <div className="flex items-center gap-4">

              {/* ICON */}
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Search size={18} className="text-blue-600" />
              </div>

              {/* TEXT */}
              <div>
                <p className="font-semibold text-sm">
                  Mở tra cứu
                </p>
                <p className="text-sm text-slate-500 text-base hidden md:block">
                  Cho phép người dùng tra cứu thông tin thí sinh
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <Switch
                checked={settings.isSearchEnabled}
                onChange={(v) =>
                  setSettings((p) => ({
                    ...p,
                    isSearchEnabled: v,
                  }))
                }
              />

              <StatusBadge active={settings.isSearchEnabled} />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-slate-200" />

          {/* ITEM 2 */}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-bold tracking-wide">
            2. ĐIỂM CHUẨN
          </h2>
        </div>

        {/* CONTENT */}
        <div className="border border-slate-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">

          {/* KHỐI 6 */}
          {["6", "10"].map((g) => (
            <div key={g} className="space-y-2">
              <label className="text-sm font-semibold mb-1 md:mb-2 block">
                Khối {g}
              </label>
              <input
                type="text"
                inputMode="decimal"
                disabled={!settings.isSearchEnabled}
                value={settings[`cutoffScoreGrade${g}`] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;

                  // cho phép số + dấu chấm hoặc rỗng
                  if (/^\d*\.?\d*$/.test(val)) {
                    setSettings((p) => ({
                      ...p,
                      [`cutoffScoreGrade${g}`]: val === "" ? null : val, // 👈 giữ string
                    }));
                  }
                }}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          ))}

        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            className="rounded-lg text-bold"
            onClick={handleUpdate}
          >
            LƯU CẤU HÌNH
          </Button>
        </div>
      </div>
    </div>
  );
};


/* ------------------ STATUS BADGE ------------------ */
function StatusBadge({ active }) {
  return (
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full hidden md:block ${active
        ? "bg-green-100 text-green-600"
        : "bg-slate-100 text-slate-400"
        }`}
    >
      {active ? "ĐANG BẬT" : "ĐANG TẮT"}
    </span>
  );
}
export default AdminSetting;