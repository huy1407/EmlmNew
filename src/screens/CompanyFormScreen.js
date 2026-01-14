import React, { useState } from "react";
import { Alert, ScrollView, View, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import Label from "../components/Label";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import useResponsiveColumns from "../components/useResponsiveColumns";

export default function CompanyFormScreen({ navigateTo, addCompany }) {
  const columns = useResponsiveColumns(768);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    website: "",
    fanpage: "",
    registerLink: "",
    referrer: "",
    products: "",
    joinFee: "",
    commission: "",
    incomePromise: "",
    riskChecks: [],
    notes: "",
  });

  const riskItems = [
    "Cam kết lợi nhuận cao bất thường",
    "Yêu cầu tuyển dụng liên tục",
    "Tập trung vào tuyển thành viên hơn sản phẩm",
    "Phí tham gia cao",
    "Không có sản phẩm thực tế",
    "Cơ cấu hoa hồng phức tạp",
    "Áp lực mua hàng tồn kho",
  ];

  const toggleRisk = (risk) => {
    setFormData((prev) => ({
      ...prev,
      riskChecks: prev.riskChecks.includes(risk)
        ? prev.riskChecks.filter((r) => r !== risk)
        : [...prev.riskChecks, risk],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.country.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập Tên doanh nghiệp và Quốc gia.");
      return;
    }
    try {
      await addCompany(formData);
      Alert.alert("Thành công", "Đã lưu thông tin doanh nghiệp!");
      navigateTo("company-list");
    } catch (e) {
      Alert.alert("Lỗi", e?.message || "Không lưu được dữ liệu");
    }
  };

  const rowGap = 10;

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
        <Text
          style={{
            fontSize: 22,
            fontWeight: "900",
            color: theme.colors.text,
            marginBottom: 10,
          }}
        >
          Khai báo Doanh nghiệp Đa cấp
        </Text>

        <Label>Tên doanh nghiệp *</Label>
        <Input
          value={formData.name}
          placeholder="Nhập tên doanh nghiệp"
          onChangeText={(t) => setFormData({ ...formData, name: t })}
        />

        <View
          style={{
            flexDirection: columns === 2 ? "row" : "column",
            gap: rowGap,
          }}
        >
          <View style={{ flex: 1 }}>
            <Label>Quốc gia *</Label>
            <Input
              value={formData.country}
              placeholder="Việt Nam, Singapore..."
              onChangeText={(t) => setFormData({ ...formData, country: t })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Label>Website</Label>
            <Input
              value={formData.website}
              placeholder="https://..."
              keyboardType="url"
              onChangeText={(t) => setFormData({ ...formData, website: t })}
            />
          </View>
        </View>

        <Label>Sản phẩm/Dịch vụ chính</Label>
        <Input
          value={formData.products}
          placeholder="Mô tả các sản phẩm/dịch vụ..."
          multiline
          minHeight={90}
          onChangeText={(t) => setFormData({ ...formData, products: t })}
        />

        <View
          style={{
            flexDirection: columns === 2 ? "row" : "column",
            gap: rowGap,
          }}
        >
          <View style={{ flex: 1 }}>
            <Label>Phí tham gia</Label>
            <Input
              value={formData.joinFee}
              placeholder="VD: 5,000,000 VNĐ"
              onChangeText={(t) => setFormData({ ...formData, joinFee: t })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Label>Chính sách hoa hồng</Label>
            <Input
              value={formData.commission}
              placeholder="VD: 10% doanh số"
              onChangeText={(t) => setFormData({ ...formData, commission: t })}
            />
          </View>
        </View>

        <Label>Cam kết thu nhập</Label>
        <Input
          value={formData.incomePromise}
          placeholder="VD: 10 triệu/tháng sau 3 tháng"
          onChangeText={(t) => setFormData({ ...formData, incomePromise: t })}
        />

        <Label>Dấu hiệu rủi ro</Label>
        <View style={{ marginTop: 6, gap: 8 }}>
          {riskItems.map((risk, idx) => {
            const checked = formData.riskChecks.includes(risk);
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.85}
                onPress={() => toggleRisk(risk)}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: 12,
                  borderRadius: theme.radius.md,
                  borderWidth: 1,
                  borderColor: checked ? theme.colors.red : "#FECACA",
                  backgroundColor: "#FEF2F2",
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: theme.colors.red,
                    backgroundColor: checked ? theme.colors.red : "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "900" }}>
                    {checked ? "✓" : ""}
                  </Text>
                </View>

                <Text style={{ flex: 1, color: "#374151", lineHeight: 20 }}>
                  {risk}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {formData.riskChecks.length > 0 && (
          <View
            style={{
              marginTop: 12,
              backgroundColor: "#FFFBEB",
              borderLeftWidth: 4,
              borderLeftColor: "#F59E0B",
              padding: 12,
              borderRadius: theme.radius.md,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Ionicons name="warning-outline" size={20} color="#B45309" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "900", color: "#92400E" }}>
                Cảnh báo rủi ro
              </Text>
              <Text style={{ marginTop: 6, color: "#A16207" }}>
                Phát hiện {formData.riskChecks.length} dấu hiệu rủi ro. Cần thận trọng!
              </Text>
            </View>
          </View>
        )}

        <Label>Ghi chú thêm</Label>
        <Input
          value={formData.notes}
          placeholder="Thông tin bổ sung..."
          multiline
          minHeight={90}
          onChangeText={(t) => setFormData({ ...formData, notes: t })}
        />

        <PrimaryButton title="Lưu thông tin" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
