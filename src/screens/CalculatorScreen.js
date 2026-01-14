import React, { useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import BackButton from "../components/BackButton";
import Label from "../components/Label";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import KeyValue from "../components/KeyValue";
import MiniStat from "../components/MiniStat";
import useResponsiveColumns from "../components/useResponsiveColumns";
import { theme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

const formatVnd = (n) =>
  (Number.isFinite(n) ? Math.round(n) : 0).toLocaleString("vi-VN") + " đ";

export default function CalculatorScreen({ navigateTo }) {
  const columns = useResponsiveColumns(768);

  const [inputs, setInputs] = useState({
    joinFee: 5000000,
    personalSales: 10000000,
    recruitCount: 5,
    commissionRate: 10,
    levelCommission: 5,
    monthlyCost: 2000000,
  });

  const [results, setResults] = useState(null);

  const setNum = (key, value) => {
    const n = Number(value);
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(n) ? n : 0 }));
  };

  const calculate = () => {
    const directCommission = (inputs.personalSales * inputs.commissionRate) / 100;
    const teamCommission =
      (inputs.personalSales * inputs.recruitCount * inputs.levelCommission) / 100;
    const totalRevenue = directCommission + teamCommission;
    const netProfit = totalRevenue - inputs.monthlyCost;
    const breakEvenMonths = Math.ceil(inputs.joinFee / (netProfit > 0 ? netProfit : 1));

    setResults({
      directCommission,
      teamCommission,
      totalRevenue,
      monthlyCost: inputs.monthlyCost,
      netProfit,
      breakEvenMonths,
    });
  };

  const roiPercent = useMemo(() => {
    if (!results) return 0;
    if (inputs.personalSales <= 0) return 0;
    return (results.totalRevenue / inputs.personalSales) * 100;
  }, [results, inputs.personalSales]);

  const rowGap = 10;
  const inputRowStyle = { flexDirection: columns === 2 ? "row" : "column", gap: rowGap };

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
        <Text style={{ fontSize: 22, fontWeight: "900", color: theme.colors.text }}>
          Mô phỏng Thu nhập
        </Text>
        <Text style={{ marginTop: 6, color: theme.colors.muted }}>
          Tính toán lợi nhuận thực tế từ mô hình đa cấp
        </Text>

        <View style={{ marginTop: 16, gap: 12 }}>
          <View style={inputRowStyle}>
            <View style={{ flex: 1 }}>
              <Label>Phí tham gia (VNĐ)</Label>
              <Input
                value={String(inputs.joinFee)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("joinFee", t)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Label>Doanh số cá nhân/tháng (VNĐ)</Label>
              <Input
                value={String(inputs.personalSales)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("personalSales", t)}
              />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={{ flex: 1 }}>
              <Label>Số người tuyến dưới</Label>
              <Input
                value={String(inputs.recruitCount)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("recruitCount", t)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Label>Hoa hồng trực tiếp (%)</Label>
              <Input
                value={String(inputs.commissionRate)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("commissionRate", t)}
              />
            </View>
          </View>

          <View style={inputRowStyle}>
            <View style={{ flex: 1 }}>
              <Label>Hoa hồng cấp dưới (%)</Label>
              <Input
                value={String(inputs.levelCommission)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("levelCommission", t)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Label>Chi phí phát sinh/tháng (VNĐ)</Label>
              <Input
                value={String(inputs.monthlyCost)}
                keyboardType="numeric"
                onChangeText={(t) => setNum("monthlyCost", t)}
              />
            </View>
          </View>
        </View>

        <PrimaryButton
          title="Tính toán"
          onPress={calculate}
          leftIcon={<Ionicons name="calculator-outline" size={18} color="#fff" />}
        />

        {results && (
          <View style={{ marginTop: 18, gap: 12 }}>
            <View
              style={{
                backgroundColor: "#ECFDF5",
                borderRadius: theme.radius.lg,
                padding: 14,
                borderWidth: 1,
                borderColor: "#BBF7D0",
              }}
            >
              <Text style={{ fontWeight: "900", color: "#14532D", marginBottom: 10 }}>
                📈 Kết quả mô phỏng
              </Text>

              <KeyValue
                label="Hoa hồng trực tiếp:"
                value={formatVnd(results.directCommission)}
                valueColor={theme.colors.green}
              />
              <KeyValue
                label="Hoa hồng từ team:"
                value={formatVnd(results.teamCommission)}
                valueColor={theme.colors.green}
              />

              <View style={{ height: 1, backgroundColor: "#BBF7D0", marginTop: 10 }} />

              <KeyValue
                label="Tổng doanh thu:"
                value={formatVnd(results.totalRevenue)}
                valueBold
                valueSize={16}
                valueColor="#15803D"
              />

              <KeyValue
                label="Chi phí hàng tháng:"
                value={"-" + formatVnd(results.monthlyCost)}
                valueColor="#DC2626"
              />

              <View style={{ height: 1, backgroundColor: "#BBF7D0", marginTop: 10 }} />

              <KeyValue
                label="Lợi nhuận ròng:"
                value={(results.netProfit > 0 ? "+" : "") + formatVnd(results.netProfit)}
                valueBold
                valueSize={18}
                valueColor={results.netProfit > 0 ? "#15803D" : "#B91C1C"}
              />
            </View>

            <View
              style={{
                borderRadius: theme.radius.lg,
                padding: 14,
                borderWidth: 1,
                backgroundColor: results.netProfit > 0 ? "#EFF6FF" : "#FEF2F2",
                borderColor: results.netProfit > 0 ? "#BFDBFE" : "#FECACA",
              }}
            >
              <Text style={{ fontWeight: "900", color: results.netProfit > 0 ? "#1E40AF" : "#991B1B" }}>
                💰 Thời gian hòa vốn
              </Text>

              {results.netProfit > 0 ? (
                <Text style={{ marginTop: 6, color: "#1D4ED8" }}>
                  Dự kiến hòa vốn sau{" "}
                  <Text style={{ fontSize: 24, fontWeight: "900" }}>{results.breakEvenMonths}</Text>{" "}
                  tháng
                </Text>
              ) : (
                <View style={{ marginTop: 8 }}>
                  <Text style={{ color: "#B91C1C", fontWeight: "900" }}>
                    ⚠️ Cảnh báo: Lợi nhuận âm!
                  </Text>
                  <Text style={{ marginTop: 6, color: "#DC2626" }}>
                    Với số liệu hiện tại, bạn đang thua lỗ mỗi tháng. Cân nhắc kỹ trước khi tham gia!
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                backgroundColor: theme.colors.yellowBg,
                borderWidth: 1,
                borderColor: theme.colors.yellowBorder,
                borderRadius: theme.radius.lg,
                padding: 12,
              }}
            >
              <Text style={{ color: "#92400E", lineHeight: 20 }}>
                <Text style={{ fontWeight: "900" }}>Lưu ý:</Text> Đây là mô phỏng lý thuyết. Thực tế có thể khác do nhiều yếu tố:
                khả năng bán hàng, tuyển người, cạnh tranh thị trường, chi phí phát sinh...
              </Text>
            </View>

            <View style={{ flexDirection: columns === 2 ? "row" : "column", gap: rowGap }}>
              <MiniStat value={`${inputs.commissionRate}%`} label="Hoa hồng trực tiếp" color={theme.colors.primary} />
              <MiniStat value={`${inputs.recruitCount}`} label="Người tuyến dưới" color={theme.colors.purple} />
              <MiniStat value={`${roiPercent.toFixed(1)}%`} label="ROI trên doanh số" color={theme.colors.orange} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
