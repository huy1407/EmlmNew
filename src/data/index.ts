/** eMLM - Static local data (no admin, no API) */
import type {
  KnowledgeArticle,
  RegulationDoc,
  Company,
  QAItem,
  AlertPost,
  NewsItem,
} from "../types";

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "k1",
    title: "MLM là gì? Khái niệm cơ bản",
    category: "Cơ bản",
    content:
      "Multi-Level Marketing (MLM) hay kinh doanh đa cấp là mô hình bán hàng trực tiếp qua mạng lưới người tham gia. Người tham gia vừa là người tiêu dùng vừa có thể giới thiệu người khác tham gia và nhận hoa hồng.\n\nMô hình này có nhiều biến thể. Một số doanh nghiệp hoạt động minh bạch, tuân thủ pháp luật; một số khác có thể có dấu hiệu rủi ro, cần thận trọng khi tham gia.",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "k2",
    title: "Cách nhận biết mô hình có dấu hiệu rủi ro",
    category: "Cảnh giác",
    content:
      "Một số dấu hiệu cần thận trọng khi đánh giá mô hình MLM:\n\n- Hứa hẹn thu nhập cao bất thường trong thời gian ngắn\n- Áp lực phải đặt cọc hoặc mua sản phẩm để tham gia\n- Chú trọng tuyển người hơn bán sản phẩm thực tế\n- Không có sản phẩm hoặc dịch vụ rõ ràng\n\nKhuyến nghị tìm hiểu thêm từ nhiều nguồn trước khi quyết định tham gia.",
    updatedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "k3",
    title: "Pháp luật Việt Nam về kinh doanh đa cấp",
    category: "Pháp lý",
    content:
      "Tại Việt Nam, kinh doanh đa cấp được điều chỉnh bởi Nghị định 40/2018/NĐ-CP. Doanh nghiệp kinh doanh đa cấp phải được cấp phép bởi Bộ Công Thương.\n\nNgười tham gia nên kiểm tra doanh nghiệp có trong danh sách được cấp phép hay không. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-13T08:00:00Z",
  },
  {
    id: "k4",
    title: "Hợp đồng tham gia: Những điều cần lưu ý",
    category: "Kinh nghiệm",
    content:
      "Trước khi ký hợp đồng tham gia mạng lưới MLM, hãy chú ý:\n\n- Đọc kỹ điều khoản về hoàn trả, hủy hợp đồng\n- Hiểu rõ cơ chế hoa hồng và điều kiện nhận\n- Không ký khi bị ép buộc hoặc chưa hiểu rõ\n\nKhuyến nghị tìm hiểu thêm hoặc tham khảo ý kiến chuyên gia nếu cần.",
    updatedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "k5",
    title: "Thu nhập trong MLM: Thực tế và kỳ vọng",
    category: "Thu nhập",
    content:
      "Thu nhập từ MLM phụ thuộc nhiều yếu tố: doanh số bán hàng, cấp bậc, chính sách công ty. Đa số người tham gia có thu nhập thấp hoặc không đạt kỳ vọng.\n\nTránh kỳ vọng thu nhập ổn định ngay từ đầu. Khuyến nghị tìm hiểu thêm từ nhiều nguồn độc lập trước khi quyết định.",
    updatedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "k6",
    title: "An toàn thông tin cá nhân khi tham gia",
    category: "Bảo mật",
    content:
      "Khi tham gia bất kỳ chương trình nào, hãy bảo vệ thông tin cá nhân:\n\n- Chỉ cung cấp thông tin cần thiết\n- Cẩn trọng với tài liệu yêu cầu CMND, sổ hộ khẩu\n- Không chia sẻ mật khẩu ngân hàng\n\nCó dấu hiệu rủi ro nếu bên tuyển dụng yêu cầu quá nhiều thông tin nhạy cảm mà không giải thích rõ mục đích.",
    updatedAt: "2025-01-10T16:00:00Z",
  },
];

export const REGULATION_DOCS: RegulationDoc[] = [
  {
    id: "r1",
    title: "Nghị định 40/2018 về kinh doanh đa cấp",
    summary: "Quy định về điều kiện, thủ tục cấp phép và hoạt động kinh doanh đa cấp tại Việt Nam.",
    sourceUrl: "https://vanban.chinhphu.vn/?pageid=27160&docid=195801",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "r2",
    title: "Thông tư 07/2019 hướng dẫn Nghị định 40",
    summary: "Hướng dẫn chi tiết thủ tục đăng ký, báo cáo hoạt động kinh doanh đa cấp.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-09T00:00:00Z",
  },
  {
    id: "r3",
    title: "Luật Bảo vệ quyền lợi người tiêu dùng",
    summary: "Các quyền cơ bản của người tiêu dùng khi mua hàng trực tiếp.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-08T00:00:00Z",
  },
  {
    id: "r4",
    title: "Quy định về quảng cáo sản phẩm MLM",
    summary: "Giới hạn và yêu cầu khi quảng cáo sản phẩm kinh doanh đa cấp.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-07T00:00:00Z",
  },
  {
    id: "r5",
    title: "Xử phạt hành chính vi phạm kinh doanh đa cấp",
    summary: "Mức phạt đối với hành vi kinh doanh đa cấp không có giấy phép hoặc vi phạm quy định.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-06T00:00:00Z",
  },
  {
    id: "r6",
    title: "Danh sách doanh nghiệp được cấp phép",
    summary: "Công bố danh sách doanh nghiệp kinh doanh đa cấp hợp pháp tại Việt Nam.",
    sourceUrl: "https://www.moit.gov.vn/",
    updatedAt: "2025-01-05T00:00:00Z",
  },
];

// Nguồn tham khảo: Bộ Công Thương, vcca.gov.vn, moit.gov.vn, Google
export const COMPANIES: Company[] = [
  {
    id: "c1",
    name: "Công ty TNHH MTV Herbalife Việt Nam",
    shortDesc: "Thực phẩm dinh dưỡng, hỗn hợp dinh dưỡng công thức 1, bột protein, trà thảo mộc, thực phẩm bảo vệ sức khỏe.",
    websiteUrl: "https://vn.myherbalife.com/",
    tags: ["Dinh dưỡng", "TPBVSK"],
    communitySignals: { transparentCount: 180, researchCount: 45 },
  },
  {
    id: "c2",
    name: "Công ty TNHH Amway Việt Nam",
    shortDesc: "Dinh dưỡng Nutrilite, mỹ phẩm Artistry, chăm sóc cá nhân và gia dụng. Có giấy phép hoạt động bán hàng đa cấp.",
    websiteUrl: "https://www.amway.com.vn/",
    tags: ["Dinh dưỡng", "Mỹ phẩm", "Gia dụng"],
    communitySignals: { transparentCount: 200, researchCount: 50 },
  },
  {
    id: "c3",
    name: "Công ty TNHH Oriflame Việt Nam",
    shortDesc: "Mỹ phẩm Thụy Điển: chăm sóc da Optimals, trang điểm, nước hoa, chăm sóc tóc. Dòng Wellosophy chăm sóc sức khỏe.",
    websiteUrl: "https://www.oriflame.vn/",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    communitySignals: { transparentCount: 150, researchCount: 60 },
  },
  {
    id: "c4",
    name: "Công ty TNHH Nu Skin Enterprises Việt Nam",
    shortDesc: "Mỹ phẩm, chăm sóc da, thiết bị chăm sóc sắc đẹp. Có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    websiteUrl: "https://www.nuskin.com/",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    communitySignals: { transparentCount: 120, researchCount: 55 },
  },
  {
    id: "c5",
    name: "Công ty TNHH Thiên Sư Việt Nam",
    shortDesc: "Thực phẩm chức năng TIENS (Tập đoàn TIENS Trung Quốc). Có giấy phép hoạt động bán hàng đa cấp.",
    websiteUrl: "https://www.tiens.com.vn/",
    tags: ["Thực phẩm chức năng", "Sức khỏe"],
    communitySignals: { transparentCount: 85, researchCount: 80 },
  },
  {
    id: "c6",
    name: "Công ty TNHH Care For Việt Nam",
    shortDesc: "Sản phẩm chăm sóc sức khỏe, thực phẩm bảo vệ sức khỏe. Có giấy phép hoạt động bán hàng đa cấp.",
    tags: ["TPBVSK", "Sức khỏe"],
    communitySignals: { transparentCount: 90, researchCount: 50 },
  },
  {
    id: "c7",
    name: "Công ty TNHH Unicity Marketing Việt Nam",
    shortDesc: "Thực phẩm dinh dưỡng, đồ uống dinh dưỡng, sản phẩm sức khỏe. Có giấy phép hoạt động bán hàng đa cấp.",
    websiteUrl: "https://www.unicity.com/",
    tags: ["Dinh dưỡng", "Đồ uống", "Sức khỏe"],
    communitySignals: { transparentCount: 95, researchCount: 45 },
  },
  {
    id: "c8",
    name: "Công ty TNHH Homeway Việt Nam",
    shortDesc: "Thiết bị gia dụng, đồ dùng gia đình qua hình thức bán hàng trực tiếp. Có giấy phép hoạt động.",
    tags: ["Gia dụng", "Đồ dùng gia đình"],
    communitySignals: { transparentCount: 70, researchCount: 60 },
  },
  {
    id: "c9",
    name: "Công ty TNHH Best World Việt Nam",
    shortDesc: "Mỹ phẩm, chăm sóc da và sắc đẹp. Có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    communitySignals: { transparentCount: 80, researchCount: 65 },
  },
  {
    id: "c10",
    name: "Công ty TNHH Total Swiss Việt Nam",
    shortDesc: "Thực phẩm bảo vệ sức khỏe (Thụy Sĩ). Có giấy phép hoạt động bán hàng đa cấp.",
    websiteUrl: "https://www.totalswiss.com/",
    tags: ["TPBVSK", "Sức khỏe"],
    communitySignals: { transparentCount: 110, researchCount: 70 },
  },
  {
    id: "c11",
    name: "Công ty TNHH Perfect Global (Việt Nam)",
    shortDesc: "Mỹ phẩm, chăm sóc da. Có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    communitySignals: { transparentCount: 65, researchCount: 55 },
  },
  {
    id: "c12",
    name: "Công ty TNHH Elken International Việt Nam",
    shortDesc: "Thực phẩm chức năng, sản phẩm chăm sóc sức khỏe (Malaysia). Có giấy phép hoạt động bán hàng đa cấp.",
    websiteUrl: "https://www.elken.com/",
    tags: ["Thực phẩm chức năng", "Sức khỏe"],
    communitySignals: { transparentCount: 100, researchCount: 50 },
  },
  {
    id: "c13",
    name: "Công ty TNHH Gcoop Việt Nam",
    shortDesc: "Sản phẩm bảo vệ sức khỏe (Hàn Quốc). Có giấy phép hoạt động bán hàng đa cấp.",
    tags: ["TPBVSK", "Sức khỏe"],
    communitySignals: { transparentCount: 75, researchCount: 70 },
  },
];

export const QA_ITEMS: QAItem[] = [
  {
    id: "q1",
    topic: "Legal",
    question: "Doanh nghiệp MLM có phải đăng ký không?",
    answer:
      "Theo pháp luật Việt Nam, doanh nghiệp kinh doanh đa cấp phải được Bộ Công Thương cấp phép. Người tham gia nên kiểm tra danh sách doanh nghiệp được cấp phép trước khi tham gia. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "q2",
    topic: "Experience",
    question: "Kinh nghiệm khi mới tham gia MLM?",
    answer:
      "Nên tìm hiểu kỹ sản phẩm, chính sách công ty, và cơ chế hoa hồng. Đặt mục tiêu hợp lý, tránh kỳ vọng thu nhập cao ngay từ đầu. Khuyến nghị tìm hiểu thêm từ nhiều nguồn.",
    updatedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "q3",
    topic: "Income",
    question: "Thu nhập trung bình từ MLM như thế nào?",
    answer:
      "Thu nhập phụ thuộc nhiều yếu tố. Đa số người tham gia có thu nhập thấp hoặc không ổn định. Tránh kỳ vọng quá cao; khuyến nghị tìm hiểu thêm từ dữ liệu độc lập.",
    updatedAt: "2025-01-13T08:00:00Z",
  },
  {
    id: "q4",
    topic: "Contracts",
    question: "Hủy hợp đồng tham gia có được hoàn tiền không?",
    answer:
      "Phụ thuộc điều khoản hợp đồng và chính sách công ty. Nghị định 40 có quy định về quyền của người tham gia. Cần đọc kỹ hợp đồng trước khi ký. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "q5",
    topic: "Legal",
    question: "Kinh doanh đa cấp bất hợp pháp là gì?",
    answer:
      "Theo pháp luật, kinh doanh đa cấp bất hợp pháp là hoạt động không có giấy phép hoặc vi phạm các quy định về bán hàng đa cấp. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "q6",
    topic: "Experience",
    question: "Có nên vay tiền để tham gia MLM không?",
    answer:
      "Khuyến nghị tìm hiểu thêm và cân nhắc kỹ. Tham gia bằng số vốn có thể chấp nhận mất. Tránh vay mượn lớn khi chưa hiểu rõ mô hình.",
    updatedAt: "2025-01-10T16:00:00Z",
  },
  {
    id: "q7",
    topic: "Income",
    question: "Khi nào có thể nhận hoa hồng?",
    answer:
      "Phụ thuộc chính sách từng công ty. Thường có điều kiện về doanh số, thời gian, cấp bậc. Cần đọc kỹ quy chế hoa hồng trước khi tham gia.",
    updatedAt: "2025-01-09T12:00:00Z",
  },
  {
    id: "q8",
    topic: "Contracts",
    question: "Hợp đồng có ràng buộc thời gian không?",
    answer:
      "Tùy công ty. Một số yêu cầu cam kết thời gian; một số linh hoạt hơn. Đọc kỹ điều khoản về chấm dứt hợp đồng.",
    updatedAt: "2025-01-08T15:00:00Z",
  },
  {
    id: "q9",
    topic: "Legal",
    question: "Ai có thể tố cáo doanh nghiệp MLM vi phạm?",
    answer:
      "Mọi cá nhân, tổ chức có quyền tố cáo khi phát hiện vi phạm. Cơ quan có thẩm quyền là Bộ Công Thương, Cục Cạnh tranh và Bảo vệ người tiêu dùng. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-07T10:00:00Z",
  },
  {
    id: "q10",
    topic: "Experience",
    question: "Làm sao nhận biết mô hình có dấu hiệu rủi ro?",
    answer:
      "Một số dấu hiệu cần thận trọng: hứa hẹn thu nhập không thực tế, áp lực mua hàng để tham gia, chú trọng tuyển người hơn bán sản phẩm. Khuyến nghị tìm hiểu thêm từ nhiều nguồn.",
    updatedAt: "2025-01-06T09:00:00Z",
  },
  {
    id: "q11",
    topic: "Income",
    question: "Có thể tham gia nhiều công ty MLM cùng lúc không?",
    answer:
      "Phụ thuộc quy định từng công ty. Một số cấm tham gia đối thủ; một số cho phép. Cần đọc kỹ hợp đồng và quy chế.",
    updatedAt: "2025-01-05T14:00:00Z",
  },
  {
    id: "q12",
    topic: "Contracts",
    question: "Sản phẩm mua có được đổi trả không?",
    answer:
      "Theo Luật Bảo vệ quyền lợi người tiêu dùng và chính sách công ty. Một số sản phẩm có chính sách đổi trả; cần xem điều khoản cụ thể. Nội dung không thay thế tư vấn pháp lý chính thức.",
    updatedAt: "2025-01-04T11:00:00Z",
  },
];

export const ALERT_POSTS: AlertPost[] = [
  {
    id: "a1",
    title: "Cảnh báo: Mô hình hứa hẹn lợi nhuận cao trong thời gian ngắn",
    description:
      "Một số mô hình xuất hiện với lời mời hứa hẹn thu nhập không thực tế trong vài tuần. Các dấu hiệu rủi ro — cần thận trọng. Khuyến nghị tìm hiểu thêm trước khi quyết định.",
    sourceNote: "Tổng hợp từ cộng đồng",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "a2",
    title: "Cần thận trọng: Áp lực đặt cọc để tham gia",
    description:
      "Một số tình huống người tham gia bị yêu cầu đặt cọc hoặc mua gói sản phẩm lớn ngay từ đầu. Có dấu hiệu rủi ro — cần thận trọng. Nên cân nhắc kỹ trước khi chi tiêu.",
    sourceNote: "Phản ánh cộng đồng",
    updatedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "a3",
    title: "Lưu ý: Công ty chưa có trong danh sách cấp phép",
    description:
      "Một số mô hình hoạt động mà chưa thấy trong danh sách doanh nghiệp được Bộ Công Thương cấp phép. Khuyến nghị kiểm tra danh sách chính thức trước khi tham gia.",
    sourceNote: "Tham khảo moit.gov.vn",
    updatedAt: "2025-01-13T08:00:00Z",
  },
  {
    id: "a4",
    title: "Cảnh báo: Yêu cầu cung cấp thông tin nhạy cảm",
    description:
      "Một số trường hợp yêu cầu CMND, sổ hộ khẩu, thông tin ngân hàng mà không giải thích rõ mục đích. Các dấu hiệu rủi ro — cần thận trọng với thông tin cá nhân.",
    sourceNote: "Tổng hợp cộng đồng",
    updatedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "a5",
    title: "Lưu ý: Sản phẩm không rõ nguồn gốc",
    description:
      "Một số mô hình phân phối sản phẩm không có nhãn mác, nguồn gốc rõ ràng. Có dấu hiệu rủi ro — cần thận trọng. Khuyến nghị tìm hiểu thêm về sản phẩm trước khi mua.",
    sourceNote: "Phản ánh cộng đồng",
    updatedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "a6",
    title: "Cảnh báo: Chú trọng tuyển người hơn bán hàng",
    description:
      "Mô hình tập trung chủ yếu vào việc tuyển thêm người tham gia thay vì bán sản phẩm thực tế. Các dấu hiệu rủi ro — cần thận trọng. Nên tìm hiểu cơ chế hoạt động kỹ trước khi tham gia.",
    sourceNote: "Tổng hợp cộng đồng",
    updatedAt: "2025-01-10T16:00:00Z",
  },
  {
    id: "a7",
    title: "Lưu ý: Hội thảo có dấu hiệu tạo áp lực",
    description:
      "Một số buổi hội thảo tạo áp lực phải quyết định ngay, ký hợp đồng tại chỗ. Có dấu hiệu rủi ro — cần thận trọng. Khuyến nghị có thời gian suy nghĩ, đọc kỹ trước khi ký.",
    sourceNote: "Phản ánh cộng đồng",
    updatedAt: "2025-01-09T12:00:00Z",
  },
  {
    id: "a8",
    title: "Cần thận trọng: Thu nhập không minh bạch",
    description:
      "Một số mô hình không công bố rõ cơ chế tính toán thu nhập, điều kiện nhận hoa hồng. Các dấu hiệu rủi ro — cần thận trọng. Nên yêu cầu tài liệu chi tiết trước khi tham gia.",
    sourceNote: "Tổng hợp cộng đồng",
    updatedAt: "2025-01-08T15:00:00Z",
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    title: "Bộ Công Thương công bố danh sách doanh nghiệp MLM được cấp phép",
    summary:
      "Cập nhật danh sách doanh nghiệp kinh doanh đa cấp hợp pháp năm 2025.",
    sourceUrl: "https://www.moit.gov.vn/",
    publishedAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "n2",
    title: "Hội thảo tư vấn người tiêu dùng về kinh doanh đa cấp",
    summary:
      "Sự kiện giúp người dân hiểu rõ quyền lợi khi tham gia mạng lưới MLM.",
    sourceUrl: "https://example.com/news/2",
    publishedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "n3",
    title: "Xu hướng MLM kết hợp thương mại điện tử",
    summary: "Nhiều doanh nghiệp chuyển sang mô hình hybrid trực tuyến.",
    sourceUrl: "https://example.com/news/3",
    publishedAt: "2025-01-13T10:00:00Z",
  },
  {
    id: "n4",
    title: "Quy định mới về quảng cáo sản phẩm đa cấp",
    summary: "Cập nhật yêu cầu quảng cáo phải trung thực, không gây hiểu lầm.",
    sourceUrl: "https://example.com/news/4",
    publishedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "n5",
    title: "Người tiêu dùng cần thận trọng với lời mời tham gia MLM",
    summary:
      "Khuyến nghị tìm hiểu kỹ, đọc hợp đồng trước khi quyết định tham gia.",
    sourceUrl: "https://example.com/news/5",
    publishedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "n6",
    title: "Các dấu hiệu cần thận trọng khi đánh giá mô hình MLM",
    summary: "Tổng hợp thông tin giúp người dân nhận biết và phòng tránh rủi ro.",
    sourceUrl: "https://example.com/news/6",
    publishedAt: "2025-01-10T16:00:00Z",
  },
  {
    id: "n7",
    title: "Hướng dẫn khiếu nại khi có tranh chấp với công ty MLM",
    summary: "Quy trình khiếu nại qua Cục Cạnh tranh và Bảo vệ người tiêu dùng.",
    sourceUrl: "https://example.com/news/7",
    publishedAt: "2025-01-09T12:00:00Z",
  },
  {
    id: "n8",
    title: "Thị trường MLM Việt Nam: Tổng quan 2024",
    summary: "Báo cáo tổng quan về thị trường kinh doanh đa cấp trong nước.",
    sourceUrl: "https://example.com/news/8",
    publishedAt: "2025-01-08T15:00:00Z",
  },
  {
    id: "n9",
    title: "Sản phẩm MLM và quy định ghi nhãn",
    summary: "Yêu cầu về nhãn mác, nguồn gốc sản phẩm phân phối đa cấp.",
    sourceUrl: "https://example.com/news/9",
    publishedAt: "2025-01-07T10:00:00Z",
  },
  {
    id: "n10",
    title: "Cộng đồng chia sẻ kinh nghiệm tham gia MLM",
    summary: "Các diễn đàn và nhóm cộng đồng hỗ trợ trao đổi thông tin.",
    sourceUrl: "https://example.com/news/10",
    publishedAt: "2025-01-06T09:00:00Z",
  },
];
