package com.sgu.happycashierscreen;

import java.util.ArrayList;
import java.util.List;

/**
 * Shared app state for staff user and sales data.
 */
public class AppState {
    private static String staffUser = "";
    private static final List<SaleRecord> salesHistory = new ArrayList<>();

    public static void setStaffUser(String user) {
        staffUser = user != null ? user : "";
    }

    public static String getStaffUser() {
        return staffUser;
    }

    public static void rememberUser(String user) {
        // Could persist to prefs/file
        staffUser = user;
    }

    public static void addSale(SaleRecord sale) {
        salesHistory.add(sale);
    }

    public static List<SaleRecord> getSalesHistory() {
        return new ArrayList<>(salesHistory);
    }

    public static void clearSales() {
        salesHistory.clear();
    }

    public record SaleRecord(
            String id,
            String productName,
            int quantity,
            double unitPrice,
            double total,
            String timestamp,
            String paymentMethod
    ) {}
}
