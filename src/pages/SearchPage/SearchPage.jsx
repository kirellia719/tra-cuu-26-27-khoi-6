import { useState } from "react";
import Header from "./Header";
import SearchArea from "./SearchArea";
import ResultDisplay from "./ResultDisplay";
import LoadingSpinner from "./LoadingSpinner";
import { candidateService } from "../services/candidateService";

export default function SearchPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const found = await candidateService.getOne(query.trim());
      setResult(found);
    } catch (err) {
      // 🔥 XỬ LÝ CHUẨN THEO API MỚI

      // 403: hệ thống chưa mở
      if (err?.status === 403) {
        setError("Hệ thống tra cứu hiện chưa được mở. Vui lòng quay lại sau.");
      }
      // 404: không tìm thấy
      else if (err?.status === 404) {
        setError("Không tìm thấy thông tin thí sinh.");
      }
      // lỗi khác
      else {
        setError(
          err?.message || "Đã xảy ra lỗi khi tra cứu. Vui lòng thử lại."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(result);


  return (
    <div className="min-h-screen flex flex-col font-sans" id="app-container">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-start bg-slate-50">

        <>
          <SearchArea
            onSearch={handleSearch}
            isLoading={isLoading}
            error={error}
          />

          <div className="container mx-auto max-w-lg mt-4 md:mt-8 px-4">
            {isLoading && <LoadingSpinner />}
          </div>

          {result && !isLoading && (
            <ResultDisplay result={result} />
          )}
        </>

      </main>

      <footer className="mt-auto py-6 text-center text-slate-400 text-sm px-4">
        <span className="block sm:inline">
          © 2026 Hệ thống Tuyển sinh
        </span>
        <span className="block sm:inline sm:ml-1">
          Trường THCS và THPT Tây Nguyên
        </span>
      </footer>
    </div>
  );
}