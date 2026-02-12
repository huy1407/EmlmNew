export type RiskLevelKey = "low" | "caution" | "high";

export interface RiskQuestion {
  id: string;
  text: string;
}

export interface RiskResultDefinition {
  key: RiskLevelKey;
  title: string;
  subtitle: string;
  guidance: string;
}

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: "q1",
    text: "Cơ hội này nhấn mạnh tuyển người tham gia mới nhiều hơn là giá trị sản phẩm/dịch vụ?",
  },
  {
    id: "q2",
    text: "Thu nhập được giới thiệu chủ yếu đến từ mạng lưới tuyến dưới hơn là bán sản phẩm đến người tiêu dùng thực?",
  },
  {
    id: "q3",
    text: "Bạn được khuyến khích mua số lượng sản phẩm lớn ngay từ đầu (hoặc hàng tháng) để \"giữ hạng\" hoặc \"giữ vị trí\"?",
  },
  {
    id: "q4",
    text: "Kế hoạch trả thưởng phức tạp, khó hiểu dù bạn đã hỏi lại nhiều lần?",
  },
  {
    id: "q5",
    text: "Nhà tuyển dụng ít khi nói về rủi ro, chi phí hoặc khả năng thua lỗ khi tham gia?",
  },
  {
    id: "q6",
    text: "Bạn được hứa hẹn thu nhập cao, tự do tài chính trong thời gian ngắn mà không nêu rõ giả định cụ thể?",
  },
  {
    id: "q7",
    text: "Bạn thấy áp lực phải quyết định nhanh (ví dụ: \"chỉ hôm nay\", \"đợt này là cuối cùng\")?",
  },
  {
    id: "q8",
    text: "Bạn được khuyên không nên hỏi ý kiến người ngoài (gia đình, bạn bè, chuyên gia) trước khi tham gia?",
  },
  {
    id: "q9",
    text: "Bạn khó tìm được tài liệu chính thức, công khai về pháp lý hoặc đăng ký hoạt động của doanh nghiệp?",
  },
  {
    id: "q10",
    text: "Tổ chức thường xuyên tổ chức sự kiện tạo cảm xúc mạnh (âm nhạc, khẩu hiệu, câu chuyện thành công) hơn là phân tích số liệu cụ thể?",
  },
  {
    id: "q11",
    text: "Bạn được gợi ý sử dụng tiền vay, thẻ tín dụng hoặc tiền tiết kiệm khẩn cấp để tham gia?",
  },
  {
    id: "q12",
    text: "Bạn cảm thấy khó ước tính cần bán bao nhiêu sản phẩm/tháng để hòa vốn với chi phí tham gia và chi phí duy trì?",
  },
  {
    id: "q13",
    text: "Bạn thấy đa số ví dụ thành công tập trung vào những người ở cấp bậc rất cao trong hệ thống?",
  },
  {
    id: "q14",
    text: "Bạn ít thấy thông tin về tỷ lệ người tham gia không đạt được thu nhập như kỳ vọng?",
  },
  {
    id: "q15",
    text: "Bạn được kỳ vọng dành rất nhiều thời gian cho hoạt động nhưng không có mô tả rõ ràng về khách hàng mục tiêu cụ thể?",
  },
  {
    id: "q16",
    text: "Bạn gặp khó khăn khi tự mình giải thích mô hình này cho người khác một cách đơn giản, dễ hiểu?",
  },
  {
    id: "q17",
    text: "Bạn được khuyến khích ưu tiên \"xây hệ thống\" hơn là học kiến thức về sản phẩm, thị trường hoặc pháp luật liên quan?",
  },
  {
    id: "q18",
    text: "Bạn cảm thấy nếu không tiếp tục tuyển thêm người, thu nhập của bạn sẽ giảm mạnh hoặc không ổn định?",
  },
  {
    id: "q19",
    text: "Bạn khó tìm được đánh giá độc lập từ nhiều nguồn khác nhau về doanh nghiệp/mô hình này?",
  },
  {
    id: "q20",
    text: "Bạn có cảm giác áp lực, lo lắng hoặc không thoải mái khi nghĩ đến việc rủ thêm người thân/bạn bè cùng tham gia?",
  },
];

export const RISK_RESULT_DEFINITIONS: RiskResultDefinition[] = [
  {
    key: "low",
    title: "Mức rủi ro thấp (Low)",
    subtitle: "Ít câu trả lời \"Có\"",
    guidance:
      "Theo các câu hỏi trên, bạn hiện đánh dấu ít dấu hiệu thường được cộng đồng nhắc đến khi nói về mô hình MLM rủi ro. Điều này KHÔNG phải là bảo đảm an toàn. Bạn vẫn nên đọc kỹ tài liệu, so sánh nhiều nguồn độc lập và cân nhắc mục tiêu cá nhân.",
  },
  {
    key: "caution",
    title: "Cần thận trọng (Need Caution)",
    subtitle: "Có một số dấu hiệu cần lưu ý",
    guidance:
      "Một số câu trả lời \"Có\" gợi ý mô hình có những đặc điểm thường được nhắc đến khi trao đổi về rủi ro trong MLM. Bạn có thể tạm dừng, ghi lại các câu hỏi còn băn khoăn, tìm thông tin từ cơ quan quản lý, chuyên gia độc lập và người đã từng tham gia trước khi quyết định.",
  },
  {
    key: "high",
    title: "Nhiều dấu hiệu rủi ro (High Risk Signs)",
    subtitle: "Nhiều câu trả lời \"Có\"",
    guidance:
      "Bạn đánh dấu khá nhiều dấu hiệu thường được cộng đồng và tài liệu tham khảo đề cập khi nói về mô hình MLM có rủi ro cao. Hãy cân nhắc kỹ: ưu tiên an toàn tài chính cá nhân, tránh vội vã, tìm hiểu thông tin từ nguồn chính thống và độc lập, và chỉ quyết định khi bạn đã thật sự hiểu rõ.",
  },
];

