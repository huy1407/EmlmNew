import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { theme } from "../styles/theme";

interface IntroScreenProps {
  onBack: () => void;
}

export default function IntroScreen({ onBack }: IntroScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DisclaimerBanner />
      <View style={styles.section}>
        <Text style={styles.heading}>MLM là gì?</Text>
        <Text style={styles.body}>
          Multi-Level Marketing (MLM) hay kinh doanh đa cấp là mô hình bán hàng
          trực tiếp qua mạng lưới người tham gia. Người tham gia vừa là người
          tiêu dùng vừa có thể giới thiệu người khác và nhận hoa hồng.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Mục tiêu của eMLM</Text>
        <Text style={styles.body}>
          eMLM là ứng dụng cộng đồng cung cấp thông tin tham khảo về kinh doanh
          đa cấp: kiến thức, pháp luật, doanh nghiệp, hỏi đáp, cảnh báo và tin
          tức. Mục tiêu là hỗ trợ người dùng tìm hiểu và đưa ra quyết định có
          thông tin.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Cách sử dụng app an toàn</Text>
        <Text style={styles.body}>
          • Thông tin trong app chỉ mang tính tham khảo, không thay thế tư vấn
          chuyên môn.{"\n"}
          • Luôn kiểm tra nguồn chính thức trước khi quyết định tham gia.{"\n"}
          • Không chia sẻ thông tin nhạy cảm với bên thứ ba.{"\n"}
          • Khuyến nghị tìm hiểu thêm từ nhiều nguồn độc lập.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 24 },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: theme.colors.muted,
    lineHeight: 22,
  },
});
