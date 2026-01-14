import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Alert } from "react-native";
import BackButton from "../components/BackButton";
import { theme } from "../styles/theme";

export default function CompanyListScreen({ navigateTo, companies, onRefresh, onDelete }) {
    const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    try {
      setRefreshing(true);
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = (id) => {
    if (!onDelete) return;
    Alert.alert("Xóa doanh nghiệp", "Bạn chắc chắn muốn xóa mục này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await onDelete(id);
          } catch (e) {
            Alert.alert("Lỗi", e?.message || "Không xóa được");
          }
        },
      },
    ]);
  };
return (
    <ScrollView
      contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
      <BackButton onPress={() => navigateTo("home")} label="Quay lại" />
        <TouchableOpacity
            onPress={() => navigateTo("company-form")}
            style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: theme.radius.md,
            }}
            activeOpacity={0.9}
        >
            <Text style={{ color: "#fff", fontWeight: "900" }}>+ Thêm mới</Text>
        </TouchableOpacity>
        </View>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "900", color: theme.colors.text }}>
            Danh sách Doanh nghiệp
          </Text>

          {/*<TouchableOpacity*/}
          {/*  onPress={handleRefresh}*/}
          {/*  style={{ marginRight: 8, backgroundColor: "#111827", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14 }}*/}
          {/*  activeOpacity={0.9}*/}
          {/*>*/}
          {/*  <Text style={{ color: "#fff", fontWeight: "900" }}>Làm mới</Text>*/}
          {/*</TouchableOpacity>*/}


        </View>

        {companies.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: 30 }}>
            <Text style={{ fontSize: 48, marginBottom: 8 }}>🏢</Text>
            <Text style={{ color: "#6B7280" }}>Chưa có doanh nghiệp nào được khai báo</Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {companies.map((c) => (
              <View
                key={c.id}
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.lg,
                  padding: 14,
                  backgroundColor: "#fff",
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "900",
                      color: theme.colors.text,
                      flex: 1,
                      paddingRight: 10,
                    }}
                  >
                    {c.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(c.id)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 999,
                      backgroundColor: "#F3F4F6",
                      marginRight: 8,
                    }}
                    activeOpacity={0.9}
                  >
                    <Text style={{ fontWeight: "900" }}>🗑️</Text>
                  </TouchableOpacity>

                  {c.riskChecks?.length > 0 && (
                    <View
                      style={{
                        backgroundColor: "#FEE2E2",
                        borderRadius: 999,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}
                    >
                      <Text style={{ color: "#B91C1C", fontWeight: "900", fontSize: 12 }}>
                        {c.riskChecks.length} rủi ro
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ gap: 6, marginTop: 8 }}>
                  <Text style={{ color: theme.colors.muted }}>
                    <Text style={{ fontWeight: "800", color: "#374151" }}>Quốc gia: </Text>
                    {c.country}
                  </Text>

                  {!!c.products && (
                    <Text style={{ color: theme.colors.muted }}>
                      <Text style={{ fontWeight: "800", color: "#374151" }}>Sản phẩm: </Text>
                      {c.products}
                    </Text>
                  )}

                  {!!c.joinFee && (
                    <Text style={{ color: theme.colors.muted }}>
                      <Text style={{ fontWeight: "800", color: "#374151" }}>Phí tham gia: </Text>
                      {c.joinFee}
                    </Text>
                  )}

                  {!!c.incomePromise && (
                    <Text style={{ color: theme.colors.orange }}>
                      <Text style={{ fontWeight: "800", color: "#374151" }}>Cam kết: </Text>
                      {c.incomePromise}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
