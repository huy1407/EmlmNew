import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import Section from "../components/Section";
import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

export default function CaseStudyScreen({ navigateTo, caseStudies: apiCaseStudies }) {
  const [selectedCase, setSelectedCase] = useState(null);

  const fallbackDefaultCases = useMemo(
    () => [
      {
        id: 1,
        title: "Công ty X - Mô hình Ponzi ngụy trang",
        context:
          "Công ty X hoạt động tại Việt Nam từ 2020, hứa hẹn lợi nhuận 3-5%/tháng từ đầu tư gói VIP.",
        operation:
          'Thu tiền từ thành viên mới để trả lợi nhuận cho thành viên cũ. Không có sản phẩm thực tế, chỉ bán "gói đầu tư".',
        warnings: [
          "Cam kết lợi nhuận cố định cao",
          "Không minh bạch nguồn thu",
          "Áp lực tuyển thành viên mới",
        ],
        result:
          "Sập sau 18 tháng. Hàng nghìn người mất tiền. CEO bỏ trốn ra nước ngoài.",
        lesson:
          "Không có khoản đầu tư nào đảm bảo lợi nhuận cố định cao mà không rủi ro.",
        question:
          "Nếu bạn là thành viên, bạn sẽ nhận biết dấu hiệu bất thường nào sớm nhất?",
      },
      {
        id: 2,
        title: "Công ty Y - Bán hàng đa cấp thực thụ",
        context:
          "Công ty Y bán mỹ phẩm chất lượng cao, có giấy phép kinh doanh đầy đủ.",
        operation:
          "Thu nhập chủ yếu từ bán sản phẩm thực tế. Hoa hồng dựa trên doanh số, không phải tuyển người.",
        warnings: ["Áp lực mua hàng tồn kho", "Giá sản phẩm cao hơn thị trường"],
        result:
          "Hoạt động ổn định, một số người có thu nhập tốt từ bán hàng thực tế.",
        lesson: "Mô hình hợp pháp tập trung vào sản phẩm, không phải tuyển người.",
        question:
          "Làm sao phân biệt đây là bán hàng đa cấp hợp pháp chứ không phải lừa đảo?",
      },
    ],
    []
  );

  const cases = apiCaseStudies && apiCaseStudies.length > 0 ? apiCaseStudies : fallbackDefaultCases;

  if (selectedCase) {
    const study = cases.find((c) => c.id === selectedCase);

    return (
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <BackButton onPress={() => setSelectedCase(null)} label="Về danh sách" />

        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius.xl,
            padding: 18,
            borderWidth: 1,
            borderColor: "#EEF2FF",
            ...theme.shadow,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "900", color: theme.colors.text }}>
            {study.title}
          </Text>

          <Section title="Bối cảnh" dotColor={theme.colors.primary}>
            <Text style={{ color: "#374151", lineHeight: 20 }}>{study.context}</Text>
          </Section>

          <Section title="Cách vận hành" dotColor={theme.colors.purple}>
            <Text style={{ color: "#374151", lineHeight: 20 }}>{study.operation}</Text>
          </Section>

          <View
            style={{
              marginTop: 14,
              backgroundColor: "#FEF2F2",
              borderRadius: theme.radius.lg,
              padding: 14,
              borderWidth: 1,
              borderColor: "#FECACA",
            }}
          >
            <Text style={{ fontWeight: "900", color: "#B91C1C" }}>
              ⚠️ Dấu hiệu cảnh báo
            </Text>
            <View style={{ marginTop: 10, gap: 8 }}>
              {study.warnings.map((w, idx) => (
                <Text key={idx} style={{ color: "#374151" }}>
                  • {w}
                </Text>
              ))}
            </View>
          </View>

          <View
            style={{
              marginTop: 14,
              backgroundColor: "#FEF2F2",
              borderRadius: theme.radius.lg,
              padding: 14,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.red,
            }}
          >
            <Text style={{ fontWeight: "900", color: "#B91C1C", marginBottom: 6 }}>
              Kết quả thực tế
            </Text>
            <Text style={{ color: "#374151", lineHeight: 20 }}>{study.result}</Text>
          </View>

          <View
            style={{
              marginTop: 12,
              backgroundColor: "#ECFDF5",
              borderRadius: theme.radius.lg,
              padding: 14,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.green,
            }}
          >
            <Text style={{ fontWeight: "900", color: "#15803D", marginBottom: 6 }}>
              Bài học rút ra
            </Text>
            <Text style={{ color: "#374151", lineHeight: 20 }}>{study.lesson}</Text>
          </View>

          <View
            style={{
              marginTop: 12,
              backgroundColor: "#EFF6FF",
              borderRadius: theme.radius.lg,
              padding: 14,
            }}
          >
            <Text style={{ fontWeight: "900", color: "#1D4ED8" }}>Câu hỏi suy ngẫm</Text>
            <Text style={{ marginTop: 6, color: "#374151", fontStyle: "italic", lineHeight: 20 }}>
              {study.question}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
      <BackButton onPress={() => navigateTo("home")} label="Quay lại" />

      <View
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.xl,
          padding: 18,
          borderWidth: 1,
          borderColor: "#EEF2FF",
          ...theme.shadow,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900", color: theme.colors.text, marginBottom: 10 }}>
          Case Study Thực tế
        </Text>

        <View style={{ gap: 12 }}>
          {cases.map((study) => (
            <TouchableOpacity
              key={study.id}
              onPress={() => setSelectedCase(study.id)}
              activeOpacity={0.9}
              style={{
                borderWidth: 1,
                borderColor: "#EDE9FE",
                backgroundColor: "#F5F3FF",
                borderRadius: theme.radius.lg,
                padding: 14,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "900", color: theme.colors.text }}>
                {study.title}
              </Text>
              <Text style={{ marginTop: 6, color: theme.colors.muted }} numberOfLines={3}>
                {study.context}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Text style={{ color: theme.colors.primary, fontWeight: "800", marginRight: 4 }}>
                  Xem chi tiết
                </Text>
                <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
