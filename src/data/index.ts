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
    content: "Nghị định 40/2018/NĐ-CP quy định chi tiết về điều kiện, thủ tục cấp phép, hoạt động, tạm dừng và dừng hoạt động kinh doanh bán hàng đa cấp.\n\nNội dung chính:\n- Doanh nghiệp muốn kinh doanh đa cấp phải được Bộ Công Thương cấp phép\n- Phải tuân thủ các quy định về hoa hồng, tuyên truyền\n- Người tham gia có quyền hủy hợp đồng trong 30 ngày\n- Không được hứa hẹn thu nhập không thực tế\n- Phải công bố công khai chính sách, quy chế\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
    sourceUrl: "https://vanban.chinhphu.vn/?pageid=27160&docid=195801",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "r2",
    title: "Thông tư 07/2019 hướng dẫn Nghị định 40",
    summary: "Hướng dẫn chi tiết thủ tục đăng ký, báo cáo hoạt động kinh doanh đa cấp.",
    content: "Thông tư 07/2019/TT-BCT của Bộ Công Thương hướng dẫn chi tiết về thủ tục cấp phép, đăng ký, báo cáo hoạt động kinh doanh đa cấp.\n\nBao gồm:\n- Hồ sơ đề nghị cấp phép\n- Mẫu báo cáo hoạt động\n- Quy trình kiểm tra, xử lý vi phạm\n- Hướng dẫn tính toán hoa hồng\n- Yêu cầu công bố thông tin\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-09T00:00:00Z",
  },
  {
    id: "r3",
    title: "Luật Bảo vệ quyền lợi người tiêu dùng",
    summary: "Các quyền cơ bản của người tiêu dùng khi mua hàng trực tiếp.",
    content: "Luật Bảo vệ quyền lợi người tiêu dùng năm 2010 bảo vệ quyền lợi của người mua hàng, bao gồm cả hình thức bán hàng đa cấp.\n\nQuyền cơ bản:\n- Quyền được cung cấp thông tin đầy đủ, rõ ràng, trung thực về sản phẩm, dịch vụ\n- Quyền được lựa chọn sản phẩm, dịch vụ\n- Quyền được bảo vệ trong hợp đồng mua bán\n- Quyền khiếu nại, tố cáo\n- Quyền được bồi thường thiệt hại\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-08T00:00:00Z",
  },
  {
    id: "r4",
    title: "Quy định về quảng cáo sản phẩm MLM",
    summary: "Giới hạn và yêu cầu khi quảng cáo sản phẩm kinh doanh đa cấp.",
    content: "Quy định về quảng cáo sản phẩm kinh doanh đa cấp nhằm bảo vệ người tiêu dùng:\n\nYêu cầu:\n- Quảng cáo phải trung thực, không gây hiểu lầm\n- Không được hứa hẹn thu nhập, lợi nhuận không thực tế\n- Không được khuyến khích tham gia bằng áp lực, lừa dối\n- Phải công bố đầy đủ điều kiện tham gia\n- Không được gây hiểu lầm về sản phẩm, dịch vụ\n\nCác hành vi vi phạm sẽ bị xử phạt hành chính.\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-07T00:00:00Z",
  },
  {
    id: "r5",
    title: "Xử phạt hành chính vi phạm kinh doanh đa cấp",
    summary: "Mức phạt đối với hành vi kinh doanh đa cấp không có giấy phép hoặc vi phạm quy định.",
    content: "Mức phạt hành chính cho các vi phạm pháp luật về kinh doanh đa cấp:\n\nVi phạm nghiêm trọng:\n- Kinh doanh đa cấp không có giấy phép: Phạt từ 150 đến 200 triệu đồng\n- Vi phạm quy định về hoa hồng, tuyên truyền: Phạt từ 50 đến 100 triệu đồng\n- Che giấu thông tin, không báo cáo: Phạt từ 30 đến 50 triệu đồng\n\nCách khiếu nại:\n- Cơ quan quản lý: Bộ Công Thương, Cục Cạnh tranh\n- Liên hệ địa phương: Sở Công Thương, Chi cục Cạnh tranh\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
    sourceUrl: "https://vanban.chinhphu.vn/",
    updatedAt: "2025-01-06T00:00:00Z",
  },
  {
    id: "r6",
    title: "Danh sách doanh nghiệp được cấp phép",
    summary: "Công bố danh sách doanh nghiệp kinh doanh đa cấp hợp pháp tại Việt Nam.",
    content: "Danh sách doanh nghiệp được cấp phép kinh doanh đa cấp do Bộ Công Thương công bố và cập nhật định kỳ.\n\nThông tin danh sách:\n- Tên doanh nghiệp, địa chỉ, số điện thoại\n- Ngày cấp phép, ngày hết hiệu lực\n- Sản phẩm/dịch vụ kinh doanh\n- Số giấy phép\n\nCác bạn có thể tra cứu danh sách chính thức trên website:\n- Bộ Công Thương (moit.gov.vn)\n- Cục Cạnh tranh - Bảo vệ người tiêu dùng\n\nNếu tìm không thấy doanh nghiệp trong danh sách, đó có thể là dấu hiệu rủi ro.\n\nNội dung này không thay thế tư vấn pháp lý chính thức.",
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
    description: "Herbalife Nutrition là doanh nghiệp kinh doanh đa cấp chuyên về các sản phẩm dinh dưỡng toàn cầu. Tại Việt Nam, công ty cung cấp các sản phẩm như thực phẩm bổ sung dinh dưỡng, trà thảo mộc, và các sản phẩm chăm sóc cá nhân dưới hình thức bán hàng đa cấp.",
    licenseStatus: "licensed",
    foundedYear: 1980,
    headquarters: "Los Angeles, USA",
    websiteUrl: "https://vn.myherbalife.com/",
    tags: ["Dinh dưỡng", "TPBVSK"],
    productCategories: ["Sản phẩm dinh dưỡng", "Trà thảo mộc", "Bột protein", "Chăm sóc da"],
    communitySignals: { transparentCount: 180, researchCount: 45 },
  },
  {
    id: "c2",
    name: "Công ty TNHH Amway Việt Nam",
    shortDesc: "Dinh dưỡng Nutrilite, mỹ phẩm Artistry, chăm sóc cá nhân và gia dụng. Có giấy phép hoạt động bán hàng đa cấp.",
    description: "Amway là doanh nghiệp kinh doanh đa cấp hàng đầu toàn cầu với các dòng sản phẩm như Nutrilite (dinh dưỡng), Artistry (mỹ phẩm), và các sản phẩm chăm sóc gia đình. Công ty đã có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    licenseStatus: "licensed",
    foundedYear: 1959,
    headquarters: "Michigan, USA",
    websiteUrl: "https://www.amway.com.vn/",
    tags: ["Dinh dưỡng", "Mỹ phẩm", "Gia dụng"],
    productCategories: ["Vitamin & Thực phẩm chức năng", "Mỹ phẩm", "Sản phẩm chăm sóc gia đình"],
    communitySignals: { transparentCount: 200, researchCount: 50 },
  },
  {
    id: "c3",
    name: "Công ty TNHH Oriflame Việt Nam",
    shortDesc: "Mỹ phẩm Thụy Điển: chăm sóc da Optimals, trang điểm, nước hoa, chăm sóc tóc. Dòng Wellosophy chăm sóc sức khỏe.",
    description: "Oriflame là công ty mỹ phẩm Thụy Điển hoạt động theo mô hình kinh doanh đa cấp. Cung cấp các dòng sản phẩm chăm sóc da, trang điểm, nước hoa, chăm sóc tóc và các sản phẩm oranics từ các thành phần thiên nhiên.",
    licenseStatus: "licensed",
    foundedYear: 1967,
    headquarters: "Stockholm, Sweden",
    websiteUrl: "https://www.oriflame.vn/",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    productCategories: ["Chăm sóc da", "Trang điểm", "Nước hoa", "Chăm sóc tóc"],
    communitySignals: { transparentCount: 150, researchCount: 60 },
  },
  {
    id: "c4",
    name: "Công ty TNHH Nu Skin Enterprises Việt Nam",
    shortDesc: "Mỹ phẩm, chăm sóc da, thiết bị chăm sóc sắc đẹp. Có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    description: "Nu Skin Enterprises là công ty chuyên về mỹ phẩm cao cấp và thiết bị chăm sóc sắc đẹp công nghệ cao. Hoạt động theo mô hình kinh doanh đa cấp với các sản phẩm chăm sóc da từ các thành phần tiên tiến.",
    licenseStatus: "licensed",
    foundedYear: 1984,
    headquarters: "Utah, USA",
    websiteUrl: "https://www.nuskin.com/",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    productCategories: ["Chăm sóc da", "Thiết bị làm đẹp", "Mỹ phẩm cao cấp"],
    communitySignals: { transparentCount: 120, researchCount: 55 },
  },
  {
    id: "c5",
    name: "Công ty TNHH Thiên Sư Việt Nam",
    shortDesc: "Thực phẩm chức năng TIENS (Tập đoàn TIENS Trung Quốc). Có giấy phép hoạt động bán hàng đa cấp.",
    description: "TIENS là doanh nghiệp thực phẩm chức năng lớn từ Trung Quốc, hoạt động tại Việt Nam thông qua mô hình bán hàng đa cấp. Cung cấp các sản phẩm bổ sung dinh dưỡng, chăm sóc sức khỏe dựa trên công thức truyền thống và hiện đại.",
    licenseStatus: "licensed",
    foundedYear: 1997,
    headquarters: "Tây An, Trung Quốc",
    websiteUrl: "https://www.tiens.com.vn/",
    tags: ["Thực phẩm chức năng", "Sức khỏe"],
    productCategories: ["Thực phẩm chức năng", "Vitamin", "Sản phẩm bổ sung sức khỏe"],
    communitySignals: { transparentCount: 85, researchCount: 80 },
  },
  {
    id: "c6",
    name: "Công ty TNHH Care For Việt Nam",
    shortDesc: "Sản phẩm chăm sóc sức khỏe, thực phẩm bảo vệ sức khỏe. Có giấy phép hoạt động bán hàng đa cấp.",
    description: "Care For là công ty chuyên sản xuất và phân phối các sản phẩm bảo vệ sức khỏe, dinh dưỡng bổ sung. Hoạt động theo mô hình bán hàng đa cấp với các sản phẩm có giấy phép từ các cơ quan chức năng.",
    licenseStatus: "licensed",
    foundedYear: 2005,
    headquarters: "Hà Nội, Việt Nam",
    tags: ["TPBVSK", "Sức khỏe"],
    productCategories: ["Thực phẩm bảo vệ sức khỏe", "Vitamin", "Sản phẩm chăm sóc"],
    communitySignals: { transparentCount: 90, researchCount: 50 },
  },
  {
    id: "c7",
    name: "Công ty TNHH Unicity Marketing Việt Nam",
    shortDesc: "Thực phẩm dinh dưỡng, đồ uống dinh dưỡng, sản phẩm sức khỏe. Có giấy phép hoạt động bán hàng đa cấp.",
    description: "Unicity International là công ty dinh dưỡng quốc tế hoạt động theo mô hình kinh doanh đa cấp. Cung cấp các sản phẩm dinh dưỡng, đồ uống tăng cường sức khỏe, và các sản phẩm chăm sóc sức khỏe toàn diện.",
    licenseStatus: "licensed",
    foundedYear: 1992,
    headquarters: "Orem, Utah, USA",
    websiteUrl: "https://www.unicity.com/",
    tags: ["Dinh dưỡng", "Đồ uống", "Sức khỏe"],
    productCategories: ["Thực phẩm dinh dưỡng", "Đồ uống tăng cường sức khỏe", "Sản phẩm sức khỏe"],
    communitySignals: { transparentCount: 95, researchCount: 45 },
  },
  {
    id: "c8",
    name: "Công ty TNHH Homeway Việt Nam",
    shortDesc: "Thiết bị gia dụng, đồ dùng gia đình qua hình thức bán hàng trực tiếp. Có giấy phép hoạt động.",
    description: "Homeway là công ty chuyên phân phối các thiết bị gia dụng, đồ dùng gia đình chất lượng cao thông qua mô hình bán hàng trực tiếp. Tập trung vào sản phẩm tiện ích gia đình và công nghệ gia dụng hiện đại.",
    licenseStatus: "licensed",
    foundedYear: 2003,
    headquarters: "Hồ Chí Minh, Việt Nam",
    tags: ["Gia dụng", "Đồ dùng gia đình"],
    productCategories: ["Thiết bị gia dụng", "Công nghệ gia đình", "Đồ dùng tiện ích"],
    communitySignals: { transparentCount: 70, researchCount: 60 },
  },
  {
    id: "c9",
    name: "Công ty TNHH Best World Việt Nam",
    shortDesc: "Mỹ phẩm, chăm sóc da và sắc đẹp. Có giấy phép hoạt động bán hàng đa cấp tại Việt Nam.",
    description: "Best World International là công ty mỹ phẩm và chăm sóc sắc đẹp toàn cầu hoạt động theo mô hình bán hàng đa cấp. Cung cấp các dòng sản phẩm chăm sóc da, trang điểm, và sản phẩm sắc đẹp từ tây phương.",
    licenseStatus: "licensed",
    foundedYear: 1989,
    headquarters: "Singapore",
    tags: ["Mỹ phẩm", "Chăm sóc da"],
    productCategories: ["Chăm sóc da", "Trang điểm", "Sản phẩm sắc đẹp"],
    communitySignals: { transparentCount: 80, researchCount: 65 },
  },
  {
    id: "c10",
    name: "Công ty TNHH Total Swiss Việt Nam",
    shortDesc: "Thực phẩm bảo vệ sức khỏe (Thụy Sĩ). Có giấy phép hoạt động bán hàng đa cấp.",
    description: "Total Swiss là công ty thực phẩm bảo vệ sức khỏe từ Thụy Sĩ, nổi tiếng với các sản phẩm sử dụng các thành phần tự nhiên chất lượng cao. Hoạt động tại Việt Nam theo mô hình bán hàng đa cấp với tiêu chí bảo vệ sức khỏe toàn diện.",
    licenseStatus: "licensed",
    foundedYear: 2000,
    headquarters: "Zurich, Thụy Sĩ",
    websiteUrl: "https://www.totalswiss.com/",
    tags: ["TPBVSK", "Sức khỏe"],
    productCategories: ["Thực phẩm bảo vệ sức khỏe", "Vitamin tự nhiên", "Sản phẩm wellness"],
    communitySignals: { transparentCount: 110, researchCount: 40 },
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
    summary: "Cập nhật danh sách doanh nghiệp kinh doanh đa cấp hợp pháp năm 2025.",
    content: "Bộ Công Thương vừa công bố cập nhật danh sách các doanh nghiệp được cấp phép kinh doanh đa cấp năm 2025.\n\nThông tin chi tiết:\n- Danh sách bao gồm các công ty đã được cấp giấy phép hợp pháp\n- Người tiêu dùng có thể tra cứu trên website moit.gov.vn\n- Danh sách được cập nhật định kỳ theo từng quý\n\nKhuyến nghị:\n- Luôn kiểm tra danh sách chính thức trước khi tham gia\n- Nếu công ty không có trong danh sách, cần thận trọng\n- Liên hệ Bộ Công Thương nếu có thắc mắc",
    sourceUrl: "https://www.moit.gov.vn/",
    publishedAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "n2",
    title: "Hội thảo tư vấn người tiêu dùng về kinh doanh đa cấp",
    summary: "Sự kiện giúp người dân hiểu rõ quyền lợi khi tham gia mạng lưới MLM.",
    content: "Bộ Công Thương phối hợp với các tổ chức bảo vệ người tiêu dùng tổ chức hội thảo thông tin về kinh doanh đa cấp.\n\nNội dung hội thảo:\n- Pháp luật về kinh doanh đa cấp tại Việt Nam\n- Cách nhận biết mô hình có dấu hiệu rủi ro\n- Quyền lợi và trách nhiệm của người tham gia\n- Cách khiếu nại khi có tranh chấp\n- Kinh nghiệm từ những người đã tham gia\n\nMục đích: Giúp người dân đưa ra quyết định thông minh, an toàn khi tham gia bất kỳ chương trình nào.",
    sourceUrl: "https://example.com/news/2",
    publishedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "n3",
    title: "Xu hướng MLM kết hợp thương mại điện tử",
    summary: "Nhiều doanh nghiệp chuyển sang mô hình hybrid trực tuyến.",
    content: "Trong năm 2024-2025, ngành kinh doanh đa cấp tại Việt Nam chứng kiến xu hướng mới: kết hợp giữa bán hàng trực tiếp offline với thương mại điện tử online.\n\nĐặc điểm:\n- Sử dụng website, ứng dụng di động để quản lý đơn hàng\n- Giao dịch thanh toán qua các cổng thanh toán điện tử\n- Vẫn giữ cơ chế hoa hồng, tuyên truyền người-người\n- Quản lý thông tin thành viên qua hệ thống\n\nThách thức:\n- Cần tuân thủ pháp luật về thương mại điện tử\n- Bảo vệ thông tin cá nhân người dùng\n- Minh bạch trong công khai thông tin\n\nKhuyến nghị: Người tiêu dùng vẫn cần thận trọng, tìm hiểu kỹ dù là hình thức online hay offline.",
    sourceUrl: "https://example.com/news/3",
    publishedAt: "2025-01-13T10:00:00Z",
  },
  {
    id: "n4",
    title: "Quy định mới về quảng cáo sản phẩm đa cấp",
    summary: "Cập nhật yêu cầu quảng cáo phải trung thực, không gây hiểu lầm.",
    content: "Bộ Công Thương yêu cầu các doanh nghiệp kinh doanh đa cấp tuân thủ các quy định mới về quảng cáo sản phẩm, có hiệu lực từ tháng 01/2025.\n\nQuy định chính:\n- Tất cả quảng cáo phải trung thực, dễ hiểu\n- Không được hứa hẹn kết quả không thực tế\n- Phải công bố đầy đủ thành phần, tác dụng sản phẩm\n- Không được quảng cáo sai lệch về công dụng chữa bệnh\n- Phải ghi \"Thông tin mang tính tham khảo\"\n\nHình thức vi phạm:\n- Bị phạt từ 20 đến 50 triệu đồng\n- Tạm dừng hoạt động kinh doanh\n- Thu hồi giấy phép trong các trường hợp nghiêm trọng\n\nNgười tiêu dùng có quyền tố cáo các hành vi vi phạm.",
    sourceUrl: "https://example.com/news/4",
    publishedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "n5",
    title: "Người tiêu dùng cần thận trọng với lời mời tham gia MLM",
    summary: "Khuyến nghị tìm hiểu kỹ, đọc hợp đồng trước khi quyết định tham gia.",
    content: "Theo báo cáo từ Cục Cạnh tranh - Bảo vệ người tiêu dùng, số vụ khiếu nại liên quan đến kinh doanh đa cấp tăng 25% so với năm trước.\n\nNhững lỗi phổ biến:\n- Không đọc kỹ hợp đồng trước khi ký\n- Bị lừa về mức doanh số tối thiểu cần bán\n- Không hiểu rõ cơ chế tính toán hoa hồng\n- Mua quá nhiều sản phẩm ban đầu\n\nKhuyến nghị:\n1. Đọc hợp đồng kỹ trước khi ký\n2. Tìm hiểu từ nhiều nguồn độc lập\n3. Tìm hiểu về sản phẩm, công ty\n4. Không vay mượn tiền để tham gia\n5. Kiểm tra công ty có trong danh sách cấp phép\n6. Hỏi những người đã tham gia trước\n\nNếu có tranh chấp, liên hệ Cục Cạnh tranh - Bảo vệ người tiêu dùng để khiếu nại.",
    sourceUrl: "https://example.com/news/5",
    publishedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "n6",
    title: "Các dấu hiệu cần thận trọng khi đánh giá mô hình MLM",
    summary: "Tổng hợp thông tin giúp người dân nhận biết và phòng tránh rủi ro.",
    content: "Để giúp người tiêu dùng phòng tránh rủi ro, chúng tôi tổng hợp các dấu hiệu cần thận trọng khi đánh giá một mô hình kinh doanh đa cấp:\n\nDấu hiệu rủi ro:\n1. Hứa hẹn thu nhập cao bất thường (200%, 300% lợi nhuận/tháng)\n2. Áp lực phải mua gói sản phẩm lớn để tham gia\n3. Chú trọng vào tuyển người hơn là bán sản phẩm thực tế\n4. Không có sản phẩm rõ ràng, chỉ là uỷ quyền kinh doanh\n5. Áp lực tham dự hội thảo, đóng tiền đăng ký\n6. Không công bố minh bạch thông tin về công ty\n7. Yêu cầu quá nhiều thông tin nhạy cảm\n8. Không được phép hủy hợp đồng hoặc hủy mà bị khó khăn\n\nNếu nhận thấy những dấu hiệu này, hãy nói \"Không\" và tìm kiếm sự tư vấn từ các cơ quan chính thức.",
    sourceUrl: "https://example.com/news/6",
    publishedAt: "2025-01-10T16:00:00Z",
  },
  {
    id: "n7",
    title: "Hướng dẫn khiếu nại khi có tranh chấp với công ty MLM",
    summary: "Quy trình khiếu nại qua Cục Cạnh tranh và Bảo vệ người tiêu dùng.",
    content: "Nếu bạn gặp vấn đề khi tham gia kinh doanh đa cấp, bạn có quyền khiếu nại. Dưới đây là hướng dẫn chi tiết:\n\nBước 1: Cố gắng giải quyết trực tiếp\n- Liên hệ công ty, nêu rõ vấn đề\n- Yêu cầu bằng văn bản\n- Chụp hình, lưu giữ bằng chứng\n\nBước 2: Khiếu nại chính thức\n- Gửi đơn khiếu nại đến cơ quan bảo vệ người tiêu dùng\n- Đứng địa phương: Sở Công Thương, Chi cục Cạnh tranh\n- Cấp trung ương: Cục Cạnh tranh - Bảo vệ người tiêu dùng (Bộ Công Thương)\n\nBước 3: Cung cấp chứng cứ\n- Hợp đồng, hóa đơn, chứng từ thanh toán\n- Ghi âm, tin nhắn, email liên quan\n- Nhân chứng (nếu có)\n\nBước 4: Chờ xử lý\n- Cơ quan sẽ xem xét, điều tra\n- Có thể mất vài tháng\n- Có thể có yêu cầu bổ sung thông tin\n\nQuyền của bạn:\n- Được bồi thường thiệt hại\n- Doanh nghiệp bị xử phạt hành chính\n- Trong trường hợp nghiêm trọng, có thể bị thu hồi giấy phép",
    sourceUrl: "https://example.com/news/7",
    publishedAt: "2025-01-09T12:00:00Z",
  },
  {
    id: "n8",
    title: "Thị trường MLM Việt Nam: Tổng quan 2024",
    summary: "Báo cáo tổng quan về thị trường kinh doanh đa cấp trong nước.",
    content: "Theo báo cáo từ Bộ Công Thương, thị trường kinh doanh đa cấp Việt Nam năm 2024 có những xu hướng sau:\n\nQuy mô:\n- Khoảng 100+ doanh nghiệp được cấp phép\n- Doanh thu ước tính khoảng 1-2 tỷ USD\n- Số người tham gia tăng 15% so với 2023\n\nMô hình:\n- 60% là sản phẩm dinh dưỡng, TPBVSK\n- 25% là mỹ phẩm, chăm sóc da\n- 15% là các sản phẩm khác (gia dụng, công nghệ)\n\nThách thức:\n- Doanh thu từ bán sản phẩm thực tế chỉ chiếm 40-60% tổng doanh thu\n- Khó khăn trong việc xác định doanh thu thực sự\n- Tăng số vụ khiếu nại từ người tiêu dùng\n\nTriển vọng:\n- Pháp luật sẽ được siết chặt hơn\n- Chú trọng vào minh bạch thông tin\n- Bảo vệ quyền lợi người tiêu dùng sẽ được ưu tiên\n\nKhuyến nghị: Người tiêu dùng nên cân nhắc kỹ trước khi tham gia vào bất kỳ mô hình nào.",
    sourceUrl: "https://example.com/news/8",
    publishedAt: "2025-01-08T15:00:00Z",
  },
  {
    id: "n9",
    title: "Sản phẩm MLM và quy định ghi nhãn",
    summary: "Yêu cầu về nhãn mác, nguồn gốc sản phẩm phân phối đa cấp.",
    content: "Theo quy định pháp luật, tất cả sản phẩm phân phối qua mô hình kinh doanh đa cấp phải tuân thủ quy định ghi nhãn:\n\nThông tin bắt buộc trên nhãn:\n- Tên sản phẩm bằng tiếng Việt\n- Tên, địa chỉ nhà sản xuất, nước sản xuất\n- Hạn sử dụng, số lô sản xuất\n- Thành phần, hướng dẫn sử dụng\n- Cảnh báo, tác dụng phụ (nếu có)\n- Giải pháp bảo quản\n- Hình ảnh rõ nét\n\nYêu cầu đặc biệt:\n- Sản phẩm TPBVSK phải có số đăng ký từ Bộ Y tế\n- Mỹ phẩm phải có thông tin liên hệ nhà sản xuất\n- Không được khuyến cáo chữa bệnh nếu không có giấy phép\n\nCó dấu hiệu rủi ro:\n- Sản phẩm không có nhãn mác rõ ràng\n- Thông tin không bằng tiếng Việt\n- Nhãn mác không ghi rõ nguồn gốc\n- Quảng cáo công dụng chữa bệnh mà không có giấy phép\n\nNgười tiêu dùng có quyền yêu cầu xem thông tin chi tiết sản phẩm trước khi mua.",
    sourceUrl: "https://example.com/news/9",
    publishedAt: "2025-01-07T10:00:00Z",
  },
  {
    id: "n10",
    title: "Cộng đồng chia sẻ kinh nghiệm tham gia MLM",
    summary: "Các diễn đàn và nhóm cộng đồng hỗ trợ trao đổi thông tin.",
    content: "Ngoài thông tin chính thức từ chính phủ, các nhóm cộng đồng cũng là nguồn tham khảo quý báu:\n\nLợi ích của cộng đồng:\n- Chia sẻ kinh nghiệm thực tế từ những người đã tham gia\n- Hỗ trợ nhau trong các vấn đề khó khăn\n- Cảnh báo về các mô hình rủi ro mới\n- Trao đổi thông tin, cập nhật tin tức\n- Hỗ trợ tâm lý, chia sẻ cảm xúc\n\nNơi tìm kiếm thông tin:\n- Các nhóm trên Facebook, Zalo\n- Diễn đàn chuyên đề về MLM\n- Các trang web bảo vệ người tiêu dùng\n- Tổ chức xã hội, NGO liên quan\n\nGợi ý:\n- Tìm hiểu từ nhiều nguồn, không tin một chiều\n- Xác thực thông tin từ các cơ quan chính thức\n- Cẩn trọng với thông tin quảng cáo, lợi dụng\n- Chia sẻ trách nhiệm, không lừa dối người khác\n\nHãy tham gia cộng đồng một cách có trách nhiệm, giúp mọi người đưa ra quyết định thông minh.",
    sourceUrl: "https://example.com/news/10",
    publishedAt: "2025-01-06T09:00:00Z",
  },
];
