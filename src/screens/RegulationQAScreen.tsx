import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { theme } from "../styles/theme";
import type { RegulationDoc } from "../types";

interface RegulationQA {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface RegulationQAScreenProps {
  regulation: RegulationDoc | undefined;
  onBack: () => void;
}

const REGULATION_QA_MAP: Record<string, RegulationQA[]> = {
  r1: [
    {
      id: "q1",
      category: "Tổng quát",
      question: "Nghị định 40/2018 là gì?",
      answer: "Nghị định 40/2018/NĐ-CP là quy định về quản lý hoạt động kinh doanh theo phương thức đa cấp, bao gồm các điều kiện, thủ tục cấp phép và yêu cầu tuân thủ khi kinh doanh bán hàng đa cấp tại Việt Nam.",
    },
    {
      id: "q2",
      category: "Tổng quát",
      question: "Định nghĩa kinh doanh đa cấp là gì?",
      answer: "Kinh doanh đa cấp là hoạt động kinh doanh sử dụng mạng lưới người tham gia gồm nhiều cấp, nhiều nhánh, trong đó người tham gia được hưởng hoa hồng, tiền thưởng và lợi ích kinh tế khác từ kết quả kinh doanh của mình và của những người khác trong mạng lưới.",
    },
    {
      id: "q3",
      category: "Cấp phép",
      question: "Doanh nghiệp kinh doanh đa cấp có phải được cấp phép không?",
      answer: "Có, doanh nghiệp muốn kinh doanh bán hàng đa cấp phải được Bộ Công Thương cấp phép. Không được phép hoạt động kinh doanh đa cấp mà không có giấy chứng nhận đăng ký hoạt động.",
    },
    {
      id: "q4",
      category: "Cấp phép",
      question: "Vốn điều lệ tối thiểu là bao nhiêu?",
      answer: "Doanh nghiệp đăng ký hoạt động bán hàng đa cấp phải có vốn điều lệ từ 10 tỷ đồng trở lên.",
    },
    {
      id: "q5",
      category: "Hành vi cấm",
      question: "Những hành vi nào bị cấm trong kinh doanh đa cấp?",
      answer: "Nhiều hành vi bị cấm, bao gồm: yêu cầu đặt cọc hay mua hàng để tham gia, cung cấp thông tin gian dối về lợi ích, chi trả hoa hồng từ việc tuyển người mà không phải từ bán hàng, duy trì nhiều hợp đồng với cùng một người tham gia, v.v.",
    },
    {
      id: "q6",
      category: "Quyền người tham gia",
      question: "Người tham gia có quyền gì?",
      answer: "Người tham gia bán hàng đa cấp có quyền: hủy hợp đồng trong 30 ngày, nhận các hoa hồng, tiền thưởng theo đúng quy định, được cung cấp đầy đủ thông tin, khiếu nại khi bị vi phạm.",
    },
    {
      id: "q7",
      category: "Hàng hóa",
      question: "Những loại hàng hóa nào không được kinh doanh đa cấp?",
      answer: "Không được kinh doanh đa cấp: thuốc, trang thiết bị y tế, thuốc thú y, hóa chất nguy hiểm, sản phẩm nội dung thông tin số, và các hàng hóa khác theo quy định pháp luật.",
    },
    {
      id: "q8",
      category: "Hợp đồng",
      question: "Hợp đồng tham gia bán hàng đa cấp là gì?",
      answer: "Hợp đồng tham gia bán hàng đa cấp là thỏa thuận bằng văn bản giữa cá nhân và doanh nghiệp bán hàng đa cấp về việc tham gia mạng lưới bán hàng đa cấp, quy định quyền, nghĩa vụ của hai bên.",
    },
  ],
  r2: [
    {
      id: "q1",
      category: "Hướng dẫn",
      question: "Thông tư 07/2019 hướng dẫn những nội dung gì?",
      answer: "Thông tư 07/2019/TT-BCT hướng dẫn chi tiết về thủ tục cấp phép, đăng ký, báo cáo hoạt động kinh doanh đa cấp, kể cả hồ sơ, mẫu báo cáo, và quy trình xử lý vi phạm.",
    },
    {
      id: "q2",
      category: "Hộ sơ",
      question: "Hồ sơ đề nghị cấp phép cần những gì?",
      answer: "Hồ sơ phải bao gồm: đơn đề nghị, thông tin doanh nghiệp, mẫu hợp đồng tham gia, quy tắc hoạt động, kế hoạch trả thưởng, chương trình đào tạo, và các tài liệu khác theo quy định.",
    },
  ],
  r3: [
    {
      id: "q1",
      category: "Quyền cơ bản",
      question: "Người tiêu dùng có những quyền cơ bản nào?",
      answer: "Người tiêu dùng có quyền: được cung cấp thông tin đầy đủ, rõ ràng, trung thực; được lựa chọn sản phẩm, dịch vụ; được bảo vệ trong hợp đồng; khiếu nại, tố cáo; và được bồi thường khi bị thiệt hại.",
    },
    {
      id: "q2",
      category: "Quyền cơ bản",
      question: "Làm gì khi phát hiện thông tin gian dối về sản phẩm?",
      answer: "Bạn có quyền khiếu nại với doanh nghiệp, liên hệ cơ quan bảo vệ người tiêu dùng, hoặc tố cáo với các cơ quan chức năng địa phương. Có thể yêu cầu bồi thường thiệt hại nếu bị thiệt hại.",
    },
  ],
};

export default function RegulationQAScreen({
  regulation,
  onBack,
}: RegulationQAScreenProps) {
  const [searchText, setSearchText] = useState("");

  const faqs = regulation && REGULATION_QA_MAP[regulation.id] ? REGULATION_QA_MAP[regulation.id] : [];

  const filteredFAQs = useMemo(() => {
    if (!searchText.trim()) return faqs;

    const query = searchText.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchText]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Quay lại</Text>
        </Pressable>
        <Text style={styles.title}>Hỏi & Đáp</Text>
        <Text style={styles.subtitle}>{regulation?.title || "Câu hỏi thường gặp"}</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm câu hỏi..."
        placeholderTextColor={theme.colors.muted}
        value={searchText}
        onChangeText={setSearchText}
      />

      {filteredFAQs.length > 0 ? (
        <FlatList
          data={filteredFAQs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.faqItem}
              onPress={() => toggleExpand(item.id)}
            >
              <View style={styles.faqHeader}>
                <View style={styles.faqTitleArea}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.question} numberOfLines={2}>
                    {item.question}
                  </Text>
                </View>
                <Text style={styles.expandIcon}>
                  {expandedId === item.id ? "▼" : "▶"}
                </Text>
              </View>

              {expandedId === item.id && (
                <Text style={styles.answer}>{item.answer}</Text>
              )}
            </Pressable>
          )}
          contentContainerStyle={styles.faqList}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>Không tìm thấy câu hỏi nào</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    marginBottom: 8,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: 14,
    color: theme.colors.text,
  },
  faqList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 12,
    gap: 8,
  },
  faqTitleArea: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    lineHeight: 20,
  },
  expandIcon: {
    fontSize: 12,
    color: theme.colors.muted,
    paddingTop: 2,
  },
  answer: {
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: theme.colors.background,
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: theme.colors.muted,
  },
});
