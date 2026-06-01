import * as XLSX from "xlsx";

// Tải file mẫu
export const downloadTemplate = () => {
  const templateData = [
    {
      SBD: "10001",
      "Họ và tên": "Nguyễn Hoàng Nam",
      "Khối lớp": 10,
      "Ngày sinh": "15/05/2011",
      CCCD: "066096001234",

      // Điểm gốc
      Toán: 8.5,
      "Ngữ văn": 7.25,
      "Tiếng Anh": 9.0,

      // Điểm phúc khảo
      "Toán phúc khảo": "",
      "Văn phúc khảo": "",
      "Anh phúc khảo": "",

      "Điểm khuyến khích": 1.5,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSach");

  XLSX.writeFile(workbook, "Mau_Tuyen_Sinh_Tay_Nguyen.xlsx");
};

// Đọc file Excel sang JSON
export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      resolve(json);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
};